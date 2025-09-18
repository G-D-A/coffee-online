import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

export const MenuModel = mongoose.model('Product', productSchema);
