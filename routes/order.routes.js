const express = require("express");
const auth = require("../middleware/auth.middleware");
const checkRole = require("../middleware/admin.middleware");
const Order = require("../models/Order");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const role = req.user.role;
            const { orderBy, equalTo } = req.query;
            let list;
            if (role === "admin") {
                list = await Order.find();
            } else {
                list = await Order.find({ [orderBy]: equalTo });
            }
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newOrder = await Order.create({
                ...req.body,
                userId: req.user._id
            });
            res.status(201).send(newOrder);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    });

router.patch("/:orderId", auth, async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {new: true});
        res.send(updatedOrder);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
})

router.delete("/:orderId", checkRole("admin"), async (req, res) => {
    try {
        const { orderId } = req.params;
        const removedOrder = await Order.findById(orderId);
        await removedOrder.remove();
        return res.send(null);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
})

module.exports = router;
