const { Schema, model } = require("mongoose");

const  schema = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalPrice: Number,
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"],
        default: "pending"
    }
}, {
    timestamps: { createdAt: "created_at" }
});

module.exports = model("Order", schema);
