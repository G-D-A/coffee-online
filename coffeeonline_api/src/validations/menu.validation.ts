import * as yup from 'yup';

export const productSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().min(0).required(),
    description: yup.string().default(''),
    image: yup
        .string()
        .trim()
        .transform((v) => (v === '' ? undefined : v))
        .url()
        .notRequired(),
    stock: yup.number().min(0).default(0),
    category: yup.string().default(''),
});
