import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const doc: any = this;
    if (!doc.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10);
    doc.password = bcrypt.hashSync(doc.password, salt);
    next();
});

(userSchema as any).methods.comparePassword = function (candidate: string) {
    return bcrypt.compareSync(candidate, (this as any).password);
};

export const UserModel = mongoose.model('User', userSchema);
