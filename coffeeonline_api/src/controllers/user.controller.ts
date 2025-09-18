import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validations/user.validation';

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}
    register = async (req: Request, res: Response) => {
        const { email, password } = await registerSchema.validate(req.body);
        const user = await this.userService.registerUser(email, password);
        const safe = { _id: (user as any)._id, email: (user as any).email, role: (user as any).role };
        res.status(201).json(safe);
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = await loginSchema.validate(req.body);
        const user = await this.userService.loginUser(email, password);
        const token = new AuthService().generateToken((user as any).id, (user as any).role);
        res.json({ token });
    };

    profile = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        const user = await this.userService.getUserProfile(userId);
        res.json(user);
    };
}
