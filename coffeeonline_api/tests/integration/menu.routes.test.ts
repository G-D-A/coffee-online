import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { MenuModel } from '../../src/models/menu.model';
import { UserModel } from '../../src/models/user.model';

let mongoServer: MongoMemoryServer;
let token: string;
let productId: string;

beforeAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Register and login user
    const userData = { email: 'product@test.com', password: '123456' };
    await request(app).post('/api/users/register').send(userData);
    // elevate role to admin for mutations
    await UserModel.updateOne({ email: userData.email }, { $set: { role: 'admin' } });
    const loginRes = await request(app).post('/api/users/login').send(userData);
    token = loginRes.body.token;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await MenuModel.deleteMany({});
});

describe('Menu Routes', () => {
    it('should create a product', async () => {
        const res = await request(app)
            .post('/api/menu')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Product',
                price: 100,
                description: 'Test description',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test Product');

        productId = res.body._id;
    });

    it('should list all products (public)', async () => {
        await MenuModel.create({ name: 'P1', price: 10, description: 'D1' });

        const res = await request(app)
            .get('/api/menu');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get product details', async () => {
        const product = await MenuModel.create({ name: 'Detail Product', price: 50, description: 'Detailed' });

        const res = await request(app)
            .get(`/api/menu/${product._id}`);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Detail Product');
    });

    it('should update a product', async () => {
        const product = await MenuModel.create({ name: 'Old', price: 20, description: 'Old desc' });

        const res = await request(app)
            .post(`/api/menu/${product._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated', price: 25, description: 'Updated desc' });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated');
    });

    it('should delete a product', async () => {
        const product = await MenuModel.create({ name: 'To Delete', price: 15, description: 'X' });

        const res = await request(app)
            .delete(`/api/menu/${product._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Product deleted successfully');
    });

    it('should return 404 if product not found', async () => {
        const res = await request(app)
            .get('/api/menu/645bdbf79753f2dc0c6c7fff');

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Product not found');
    });
});
