const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });
const checkRole = require("../middleware/admin.middleware");

// all products
router.get("/", async (req, res) => {
    try {
        let { limit, page, category, order, path, query } = req.query;
        path = path || "title";
        page = page || 1;
        limit = limit || 20;
        let skip = page * limit - limit;
        let list;
        const allList = await Product.find();
        if (query) {
            const filteredList = allList.filter(item => item.title.toLowerCase().includes(query.trim()));
            return res.status(200).send({ filteredList, query });
        }
        if (category) {
            list = await Product.find({ category })
                .sort({ [path]: order })
                .limit(limit)
                .skip(skip)
        }
        if (page && limit && !category) {
            list = await Product.find()
                .limit(limit)
                .sort({ [path]: order })
                .skip(skip)
        }
        const length = allList.length;

        res.status(200).send({ list, length, page, category, order, path });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// one product by id
router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.status(200).send(product);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// products by category name
router.get("/categories/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const list = await Product.find();
        const filteredList = list.filter(i => i.category.toString() === categoryId);
        res.status(200).send(filteredList);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// add product
router.put("/", checkRole("admin"), async (req, res) => {
    try {
        const { title } = req.body;
        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.status(400).send({
                error: {
                    message: "PRODUCT_IN_DATABASE",
                    code: 400,
                }
            });
        }
        const newProduct = await Product.create({
            ...req.body,
            images: [req.body.thumbnail]
        });
        res.status(201).send(newProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// update product
router.patch("/:productId", checkRole("admin"), async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.send(updatedProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// delete product
router.delete("/:productId", checkRole("admin"), async (req, res) => {
    try {
        const { productId } = req.params;
        const removedProduct = await Product.findById(productId);
        await removedProduct.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
