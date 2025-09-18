import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { MenuModel } from '../models/menu.model';
import { productSchema } from '../validations/menu.validation';
import { MenuService } from '../services/menu.service';

@injectable()
export class MenuController {
    constructor(@inject(MenuService) private MenuService: MenuService) {}

    list = async (req: Request, res: Response): Promise<void> => {
        const products = await this.MenuService.listProducts();
        res.json(products);
    };

    details = async (req: Request, res: Response): Promise<void> => {
        const product = await this.MenuService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const payload = await productSchema.validate(req.body);
        const product = new MenuModel({ ...payload, image: (payload as any).image || (req.body as any).imgurl || '' });
        await product.save();
        res.status(201).json(product);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const payload = await productSchema.validate(req.body);
        const updateDoc: any = { ...payload };
        if (!updateDoc.image && (req.body as any).imgurl) updateDoc.image = (req.body as any).imgurl;
        const updated = await MenuModel.findByIdAndUpdate(
            req.params.id,
            updateDoc,
            { new: true }
        );

        if (!updated) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json(updated);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const deleted = await MenuModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json({ message: 'Product deleted successfully' });
    };
}
