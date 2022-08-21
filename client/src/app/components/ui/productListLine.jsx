import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cart";
import { toggleFavorite } from "../../store/favorites";
import history from "../../utils/history";
import ProductItemLine from "./productItemLine";

const ProductsListLine = ({ items }) => {
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
        <>
            {items.length > 0 ? (
                <div className="d-flex flex-column gap-3 p-4">
                    {items.map((product) => (
                        <div className="col" key={product._id}>
                            <ProductItemLine
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
            ) : (
                "isLoading..."
            )}
        </>
    );
};

ProductsListLine.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default ProductsListLine;
