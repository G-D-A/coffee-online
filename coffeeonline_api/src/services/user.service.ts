import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';

export class UserService {

    async loginUser(email: string, password: string) {
        const user: any = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const stored: string = user.password;
        const isBcryptHash = typeof stored === 'string' && stored.startsWith('$2');
        let ok = false;
        if (isBcryptHash && typeof user.comparePassword === 'function') {
            ok = user.comparePassword(password);
        } else {
            ok = stored === password;
        }
        if (!ok) throw new Error('Invalid credentials');
        return user;
    }
    async registerUser(email: string, password: string) {
        const user = new UserModel({ email, password });
        return await user.save();
    }

    async getUserProfile(userId: string) {
        const user = await UserModel.findById(userId).select('-password');
        if (!user) throw new Error('User not found');
        return user;
    }
}
