const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxLength: 50
        },
        description: {
            type: String,
            required: true,
            maxLength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxLength: 32
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
        quantity: {
            type: Number,
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            type: Boolean,
            required: false,
            // might use later
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);