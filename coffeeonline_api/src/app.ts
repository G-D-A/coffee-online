import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import cors from 'cors';

import { logger } from './infra/logger';
import { DatabaseConnector } from './infra/database.connector';
import { requestLogger } from './middleware/logger.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import protectedRoutes from './routes/protected.routes';
import productRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true
}));
app.use(requestLogger);

app.use('/api/users', userRoutes);
app.use('/api/menu', productRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/protected', authMiddleware, protectedRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);


// Simple route
app.get('/', (_req, res) => {
    res.send({ status: 'OK', message: 'CoffeeOnline API is running' });
});

app.use(errorMiddleware);


// Start server after DB connection
const db = DatabaseConnector.getInstance();
db.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('Failed to start server', err);
        process.exit(1);
    });

export default app;
