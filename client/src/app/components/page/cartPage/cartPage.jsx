import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../ui/cartItem";
import {
    clearCart,
    decrementQuantity,
    getCartList,
    incrementQuantity,
    removeProductFromCart
} from "../../../store/cart";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../../store/favorites";
import ClearButton from "../../common/clearButton";
import productService from "../../../services/product.service";
import Loader from "../../common/loader";
import history from "../../../utils/history";
import OrderForm from "../../ui/forms/orderForm";
import noImage from "../../../assets/images/no_icon.png";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartListIds = useSelector(getCartList());
    const [cartList, setCartList] = useState();
    useEffect(() => {
        getProducts(cartListIds).then((res) => setCartList(res));
    }, [cartListIds]);
    async function getProducts(ids) {
        const result = [];
        if (cartListIds) {
            for (const item of ids) {
                const { productId } = item;
                const { content } = await productService.getOneProduct(
                    productId
                );
                if (content) {
                    result.push({ ...content, quantity: item.quantity });
                } else {
                    result.push({
                        _id: productId,
                        thumbnail: noImage
                    });
                }
            }
        }
        return result;
    }
    const handleRemove = (id) => {
        dispatch(removeProductFromCart(id));
    };
    const handleDecrement = (data) => {
        dispatch(decrementQuantity(data));
    };
    const handleIncrement = (data) => {
        dispatch(incrementQuantity(data));
    };
    const handleClear = () => {
        dispatch(clearCart());
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`/products/${productId}`);
    };
    return (
        <div className="container pt-3">
            {cartList ? (
                <>
                    {cartList.length > 0 ? (
                        <div className="row">
                            <div className="col-9">
                                {cartList.map((p) => (
                                    <CartItem
                                        key={p._id}
                                        product={p}
                                        quantity={p.quantity}
                                        onRemove={() => handleRemove(p._id)}
                                        onDecrement={handleDecrement}
                                        onIncrement={handleIncrement}
                                        onToggleFavorite={() =>
                                            handleToggleFavorite(p._id)
                                        }
                                        onOpen={handleOpenProductPage}
                                    />
                                ))}
                            </div>
                            <div className="col-3">
                                <div className="d-flex justify-content-center">
                                    <ClearButton
                                        onClick={handleClear}
                                        classes="fw-light mb-2"
                                        label="Очистить корзину"
                                    />
                                </div>
                                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                                    <OrderForm
                                        cartList={cartList}
                                        cartListIds={cartListIds}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2>В корзине еще нет товаров</h2>
                            <div>
                                Выберите нужный Вам товар из
                                <Link to="/products">
                                    {" "}
                                    каталога интернет-магазина
                                </Link>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CartPage;
