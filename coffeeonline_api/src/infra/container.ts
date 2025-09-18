import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { MenuService } from '../services/menu.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

container.registerSingleton(UserService, UserService);
container.registerSingleton(MenuService, MenuService);
container.registerSingleton(OrderService, OrderService);
container.registerSingleton(AuthService, AuthService);
