const categoriesMock = require("../mock/categories.json");
const Category = require("../models/Category");
const productsMock = require("../mock/products.json");
const Product = require("../models/Product");

module.exports = async () => {
    // const  categories = await Category.find();
    // if (categories.length !== categoriesMock.length) {
    //     await createInitialEntity(Category, categoriesMock);
    // }
    const  products = await Product.find();
    if (products.length < 90) {
        await createInitialEntity(Product, productsMock);
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    )
}
