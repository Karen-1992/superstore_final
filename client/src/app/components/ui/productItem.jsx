import React from "react";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";
import { useSelector } from "react-redux";
import { getCartProductById } from "../../store/cart";
import { getIsFavorite } from "../../store/favorites";
import ImageComponent from "../common/imageComponent";
import ProductButtons from "../common/productButtons";
import { getIsNewProduct } from "../../utils/getIsNewProduct";
import Badge from "../common/badge";
import Price from "./price";
import InStockStatus from "../common/inStockStatus";
import { dateNewProduct } from "../../constants/dateNewProduct";

const ProductItem = ({
    thumbnail,
    _id,
    title,
    price,
    stock,
    discountPercentage,
    onAddToCart,
    onOpenProductPage,
    onToggleFavorite,
    createdAt
}) => {
    const isInCart = !!useSelector(getCartProductById(_id));
    const isFavorite = useSelector(getIsFavorite(_id));
    const isNewProduct = getIsNewProduct(createdAt, dateNewProduct);
    return (
        <div className="hover d-flex flex-column bg-body justify-content-between mb-3 rounded shadow h-100 px-1">
            <div className="d-flex flex-wrap gap-2 p-1">
                {discountPercentage > 0 && (
                    <Badge color="danger" title={`-${discountPercentage}%`} />
                )}
                {discountPercentage >= 20 && (
                    <Badge color="warning" title="Суперцена" />
                )}
                {isNewProduct && <Badge color="success" title="Новинка" />}
            </div>
            <div role="button" onClick={onOpenProductPage}>
                <ImageComponent src={thumbnail} height="200px" />
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <InStockStatus quantity={stock} />
                </div>
                <div className="d-flex justify-content-end">
                    <span className="fw-light">Код: {getArtFromId(_id)}</span>
                </div>
            </div>
            <div className="text-center p-2">
                <p
                    className="fw-semibold"
                    onClick={onOpenProductPage}
                    role="button"
                >
                    {title}
                </p>
                <Price discount={discountPercentage} price={price} />
                <div className="d-flex justify-content-between py-2">
                    <ProductButtons
                        isInCart={isInCart}
                        isFavorite={isFavorite}
                        onAddToCart={onAddToCart}
                        onToggleFavorite={onToggleFavorite}
                    />
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    thumbnail: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string,
    stock: PropTypes.number,
    discountPercentage: PropTypes.number,
    price: PropTypes.number,
    onAddToCart: PropTypes.func,
    onOpenProductPage: PropTypes.func,
    onToggleFavorite: PropTypes.func
};

export default ProductItem;
