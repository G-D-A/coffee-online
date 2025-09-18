import { MenuService } from '../../../src/services/menu.service';
import { MenuModel } from '../../../src/models/menu.model';

jest.mock('../../../src/models/menu.model');

describe('MenuService', () => {
    const service = new MenuService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listProducts', () => {
        it('should return all products', async () => {
            const mockProducts = [{ id: '1', name: 'Test' }];
            (MenuModel.find as any).mockResolvedValue(mockProducts);

            const result = await service.listProducts();

            expect(MenuModel.find).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
        });
    });

    describe('getProductById', () => {
        it('should return product if found', async () => {
            const mockProduct = { id: '1', name: 'Test Product' };
            (MenuModel.findById as any).mockResolvedValue(mockProduct);

            const result = await service.getProductById('1');

            expect(MenuModel.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockProduct);
        });

        it('should throw error if product not found', async () => {
            (MenuModel.findById as any).mockResolvedValue(null);

            await expect(service.getProductById('999')).rejects.toThrow('Product not found');
            expect(MenuModel.findById).toHaveBeenCalledWith('999');
        });
    });
});
