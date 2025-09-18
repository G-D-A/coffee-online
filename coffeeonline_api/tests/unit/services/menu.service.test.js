"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../../../src/services/menu.service");
const product_model_1 = require("../../../src/models/menu.model");
jest.mock('../../../src/models/menu.model');
describe('MenuService', () => {
    const service = new product_service_1.MenuService();
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('listProducts', () => {
        it('should return all products', async () => {
            const mockProducts = [{ id: '1', name: 'Test' }];
            product_model_1.MenuModel.find.mockResolvedValue(mockProducts);
            const result = await service.listProducts();
            expect(product_model_1.MenuModel.find).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
        });
    });
    describe('getProductById', () => {
        it('should return product if found', async () => {
            const mockProduct = { id: '1', name: 'Test Product' };
            product_model_1.MenuModel.findById.mockResolvedValue(mockProduct);
            const result = await service.getProductById('1');
            expect(product_model_1.MenuModel.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockProduct);
        });
        it('should throw error if product not found', async () => {
            product_model_1.MenuModel.findById.mockResolvedValue(null);
            await expect(service.getProductById('999')).rejects.toThrow('Product not found');
            expect(product_model_1.MenuModel.findById).toHaveBeenCalledWith('999');
        });
    });
});
