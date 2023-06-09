//import mongoose from 'mongoose';
import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        detailDescription: {
            type: String,
            required: true,
        },
        imageKey: {
            type: String,
            required: true,
        },
        invetory: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Product',
    }
);

const model = mongoose.model('Product', ProductSchema);
export default model;
//export default ProductSchema;
