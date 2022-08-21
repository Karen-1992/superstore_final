const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/categories", require("./categories.routes"));
router.use("/products", require("./product.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/favorites", require("./favorites.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
