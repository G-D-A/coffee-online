import { OrderService } from '../../../src/services/order.service';
import { MenuModel } from '../../../src/models/menu.model';
import { OrderModel } from '../../../src/models/order.model';

jest.mock('../../../src/models/menu.model');
jest.mock('../../../src/models/order.model');

describe('OrderService', () => {
    const service = new OrderService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an order and calculate total', async () => {
        const mockProducts = [
            { _id: '1', price: 100 },
            { _id: '2', price: 200 },
        ];
        const saveMock = jest.fn().mockResolvedValue({ id: 'order123' });

        (MenuModel.find as any).mockResolvedValue(mockProducts);
        (OrderModel as any).mockImplementation(() => ({
            save: saveMock,
        }));

        const result = await service.createOrder('user123', ['1', '2']);
        expect(MenuModel.find).toHaveBeenCalledWith({ _id: { $in: ['1', '2'] } });
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual({ id: 'order123' });
    });

    it('should get orders by user ID', async () => {
        const mockOrders = [{ id: 'order1' }, { id: 'order2' }];
        const populateMock = jest.fn().mockResolvedValue(mockOrders);

        (OrderModel.find as any).mockReturnValue({
            populate: populateMock,
        });

        const result = await service.getOrdersByUser('user123');
        expect(OrderModel.find).toHaveBeenCalledWith({ userId: 'user123' });
        expect(result).toEqual(mockOrders);
    });
});
