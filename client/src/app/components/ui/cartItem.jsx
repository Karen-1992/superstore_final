import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";
import Counter from "../common/counter";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";
import { getIsFavorite } from "../../store/favorites";
import ImageComponent from "../common/imageComponent";
import Price from "../ui/price";
import Badge from "../common/badge";
import { getIsNewProduct } from "../../utils/getIsNewProduct";
import { dateNewProduct } from "../../constants/dateNewProduct";

const CartItem = ({
    product,
    quantity,
    onRemove,
    onDecrement,
    onIncrement,
    onOpen,
    onToggleFavorite
}) => {
    const isFavorite = useSelector(getIsFavorite(product._id));
    const data = {
        productId: product._id,
        quantity,
        ...product
    };
    const handleDecrement = () => {
        onDecrement(data);
    };
    const handleIncrement = () => {
        onIncrement(data);
    };
    const { discountValue, finalPrice } = getPriceWithDiscount(
        product.discountPercentage,
        product.price
    );
    const isNewProduct = getIsNewProduct(product.createdAt, dateNewProduct);
    return (
        <div className="row flex-nowrap border-bottom border-2 bg-body rounded mb-4 shadow">
            <div className="col-2">
                <ImageComponent
                    src={product.thumbnail}
                    height="200px"
                    onClick={() => onOpen(product._id)}
                />
            </div>
            <div className="col-4 align-self-center">
                <h5 onClick={() => onOpen(product._id)} role="button">
                    {product.title}
                </h5>
                <p>Остаток: {product.stock}</p>
                <p>Код товара: {getArtFromId(product._id)}</p>
                <div className="d-flex gap-2">
                    {product.discountPercentage > 0 && (
                        <Badge
                            color="danger"
                            title={`-${product.discountPercentage}%`}
                        />
                    )}
                    {product.discountPercentage >= 20 && (
                        <Badge color="warning" title="Суперцена" />
                    )}
                    {isNewProduct && <Badge color="success" title="Новинка" />}
                </div>
            </div>
            <div className="col align-self-center fw-light">
                <Counter
                    quantity={quantity}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                />
                <div className="d-flex justify-content-center gap-2">
                    <span onClick={onRemove} role="button">
                        Удалить
                    </span>
                    {!isFavorite && (
                        <>
                            <span>|</span>
                            <span
                                onClick={onToggleFavorite}
                                className="text-nowrap"
                                role="button"
                            >
                                В избранное
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-3 align-self-center fw-semibold fs-5">
                <Price
                    discount={product.discountPercentage * quantity}
                    discountValue={discountValue}
                    finalPrice={finalPrice * quantity}
                    price={product.price * quantity}
                />
            </div>
        </div>
    );
};

CartItem.propTypes = {
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number,
    onRemove: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onToggleFavorite: PropTypes.func,
    onOpen: PropTypes.func
};

export default CartItem;
