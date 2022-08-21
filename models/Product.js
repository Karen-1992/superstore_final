const { Schema, model } = require("mongoose");

const  schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: Number,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail: String,
    images: [String]
}, {
    timestamps: true
});

module.exports = model("Product", schema);
