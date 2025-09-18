import { MenuModel } from '../models/menu.model';

export class MenuService {
    async listProducts() {
        return await MenuModel.find();
    }

    async getProductById(productId: string) {
        const product = await MenuModel.findById(productId);
        if (!product) throw new Error('Product not found');
        return product;
    }
}
