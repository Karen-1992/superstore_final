import React from "react";
import PropTypes from "prop-types";

const ProductButtons = ({
    onAddToCart,
    isInCart,
    onToggleFavorite,
    isFavorite
}) => {
    return (
        <>
            <button
                onClick={onAddToCart}
                type="button"
                className={
                    "w-75 btn btn-" + (isInCart ? "outline-danger" : "danger")
                }
            >
                {!isInCart ? "В корзину" : "В корзине"}
            </button>
            <h3 onClick={onToggleFavorite}>
                <i
                    className={"bi bi-heart" + (isFavorite ? "-fill" : "")}
                    role="button"
                ></i>
            </h3>
        </>
    );
};

ProductButtons.propTypes = {
    onAddToCart: PropTypes.func,
    isInCart: PropTypes.bool,
    onToggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool
};

export default ProductButtons;
