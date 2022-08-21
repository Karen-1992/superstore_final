import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductItem from "./productItem";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cart";
import { toggleFavorite } from "../../store/favorites";
import history from "../../utils/history";
import productService from "../../services/product.service";

const MainProductsGroup = ({ title, params }) => {
    const [products, setProducts] = useState();
    useEffect(() => {
        productService.get(params).then((res) => setProducts(res.content.list));
    }, []);
    const dispatch = useDispatch();
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`/products/${productId}`);
    };
    return (
        <div className="my-3 px-3">
            <h2>{title}</h2>
            <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 g-4">
                {products &&
                    products.map((product) => (
                        <div className="col" key={product._id}>
                            <ProductItem
                                {...product}
                                onAddToCart={() => handleAddToCart(product)}
                                onToggleFavorite={() =>
                                    handleToggleFavorite(product._id)
                                }
                                onOpenProductPage={() =>
                                    handleOpenProductPage(product._id)
                                }
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

MainProductsGroup.propTypes = {
    params: PropTypes.object,
    title: PropTypes.string
};

export default MainProductsGroup;
