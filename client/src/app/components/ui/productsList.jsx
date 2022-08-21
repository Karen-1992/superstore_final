import React from "react";
import PropTypes from "prop-types";
import ProductItem from "./productItem";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cart";
import { toggleFavorite } from "../../store/favorites";
import history from "../../utils/history";

const ProductsList = ({ items }) => {
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
                <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-lg-4">
                    {items.map((product) => (
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
            ) : (
                "isLoading..."
            )}
        </>
    );
};

ProductsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default ProductsList;
