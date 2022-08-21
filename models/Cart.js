const { Schema, model } = require("mongoose");

const  schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
        }
    ]
}, {
    timestamps: true
});

module.exports = model("Cart", schema);