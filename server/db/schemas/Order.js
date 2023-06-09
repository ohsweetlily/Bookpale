import mongoose, { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
    {
        products: [
            {
                title: { type: String, required: true },
                amount: { type: String, required: true },
            },
        ],
        totalPrice: { type: String, required: true },
        address: {
            zipCode: { type: String, required: true },
            address1: { type: String, required: true },
            address2: { type: String, required: true },
        },
        receiverName: { type: String, required: true },
        receiverPhoneNumber: { type: String, required: true },
        status: { type: String, required: true },
        orderDate: { type: String, required: true },
        orderUser: { type: String, required: true },
    },
    {
        collection: 'Order',
        timestamps: true,
    }
);

// const OrderSchema = new Schema ({
//     productId: {
//         type: [Number], //??
//         required: true,
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//     },
//     address: {
//         zipCode: {
//             type: String,
//             required: true,
//         },
//         address1: {
//             type: String,
//             required: true,
//         },
//         address2: {
//             type: String,
//             required: true,
//         },
//         receiverName: {
//             type: String,
//             required: true,
//         },
//         receiverPhoneNumber: {
//             type: String,
//             required: true,
//         }
//     },
//     shortDescription: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: false,
//         default: '배송준비중',
//     },
// },
// {
//     timestamps: true,
// })

export default mongoose.model('Order', OrderSchema);
// module.exports = OrderSchema;
