const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

// get user cart
router.get("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const list = await Cart.findOne({ userId });
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// add
router.post("/:userId", auth, async (req, res) => {
    try {
        const { productId } = req.body;
        const { userId } = req.params;
        const userCart = await Cart.findOne({ userId });
        if (userCart) {
            const { products } = userCart;
            const itemIndex = products.findIndex(p => p.productId.toString() === productId);
            if (itemIndex === -1) {
                const newItem = {
                    ...req.body,
                    quantity: 1
                }
                products.push(newItem);
                await userCart.save();
                res.status(200).send(newItem);
            }
        } else {
            const newItem = {
                ...req.body,
                quantity: 1
            };
            const newCart = await Cart.create({
                userId,
                products: [newItem]
            });
            await newCart.save();
            res.status(200).send(newItem);
        }

    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// update quantity
router.patch("/:userId", auth, async (req, res) => {
    try {
        const { productId } = req.body;
        const { userId } = req.params;
        const userCart = await Cart.findOne({ userId });
        const { products } = userCart;
        const itemIndex = products.findIndex(p => p.productId.toString() === productId);
        products[itemIndex] = req.body;
        await userCart.save();
        res.status(200).send(userCart);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// delete one item
router.delete("/:userId/:productId", auth, async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const userCart = await Cart.findOne({ userId });
        const { products } = userCart;
        const item = products.find(p => p.productId.toString() === productId);
        await item.remove();
        await userCart.save();
        res.status(200).send(userCart);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// delete all
router.delete("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const removedCart = await Cart.findOne({ userId });
        await removedCart.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
