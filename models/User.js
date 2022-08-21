const { Schema, model } = require("mongoose");

const  schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    locality: String,
    street: String,
    homeNumber: String,
    flatNumber: String,
    cash: Number,
    sex: {
        type: String,
        enum: ["мужской", "женский"]
    },
    role: {
        type: String,
        default: "user"
    },
    phone: String
}, {
    timestamps: true
});

module.exports = model("User", schema);
