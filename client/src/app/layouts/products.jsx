import React from "react";
import { Redirect, useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage/productPage";
import ProductsListPage from "../components/page/productListPage/productsListPage";
import ProductsLoader from "../components/ui/hoc/productsLoader";
import { useSelector } from "react-redux";
import { getCategoryByName } from "../store/categories";

const Products = () => {
    const params = useParams();
    const { productId, category } = params;
    const categoryItem = useSelector(getCategoryByName(category));
    return (
        <>
            <ProductsLoader>
                {productId ? (
                    <ProductPage productId={productId} />
                ) : category && categoryItem ? (
                    <ProductsListPage category={categoryItem} />
                ) : (
                    <>
                        <Redirect to="/products" />
                        <ProductsListPage />
                    </>
                )}
            </ProductsLoader>
        </>
    );
};

export default Products;
