import React from "react";
import PropTypes from "prop-types";
import ImageComponent from "../common/imageComponent";
import { useSelector } from "react-redux";
import { getCartProductById } from "../../store/cart";
import { getIsFavorite } from "../../store/favorites";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";
import ProductButtons from "../common/productButtons";
import getArtFromId from "../../utils/getArtFromId";
import Badge from "../common/badge";
import { getIsNewProduct } from "../../utils/getIsNewProduct";
import Price from "./price";
import InStockStatus from "../common/inStockStatus";
import { dateNewProduct } from "../../constants/dateNewProduct";

const ProductItemLine = ({
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
    const { discountValue, finalPrice } = getPriceWithDiscount(
        discountPercentage,
        price
    );
    return (
        <div key={_id} className="hover row bg-body shadow p-2 rounded">
            <div role="button" onClick={onOpenProductPage} className="col">
                <ImageComponent src={thumbnail} height="100px" />
            </div>
            <div className="col">
                <div className="d-flex gap-2 p-1">
                    {discountPercentage > 0 && (
                        <Badge
                            color="danger"
                            title={`-${discountPercentage}%`}
                        />
                    )}
                    {discountPercentage >= 20 && (
                        <Badge color="warning" title="Суперцена" />
                    )}
                    {isNewProduct && <Badge color="success" title="Новинка" />}
                </div>
                <p
                    className="fw-semibold pt-2"
                    onClick={onOpenProductPage}
                    role="button"
                >
                    {title}
                </p>
                <div className="d-flex justify-content-start">
                    <InStockStatus quantity={stock} />
                </div>
            </div>
            <div className="col">
                <div className="text-end">
                    <span className="fw-light ">Код: {getArtFromId(_id)}</span>
                </div>
                <div className="d-flex justify-content-end py-1">
                    <Price
                        discount={discountPercentage}
                        discountValue={discountValue}
                        finalPrice={finalPrice}
                        price={price}
                    />
                </div>
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

ProductItemLine.propTypes = {
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

export default ProductItemLine;
