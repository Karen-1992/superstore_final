import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../../store/users";
import { toast } from "react-toastify";
import localStorageService from "../../../services/localStorage.service";
import { createOrder } from "../../../store/order";
import { clearCart } from "../../../store/cart";
import { getPriceWithDiscount } from "../../../utils/getPriceWithDiscount";
import { useCurrencies } from "../../../hooks/useCurrency";

const OrderForm = ({ cartList, cartListIds }) => {
    const dispatch = useDispatch();
    const userData = useSelector(getCurrentUserData());
    const { getConvertPrice, selectedCurrency } = useCurrencies();
    const total = getTotalPrice(cartList);
    function getTotalQuantity() {
        let quantity = 0;
        if (cartList) {
            for (const item of cartList) {
                quantity += item.quantity;
            }
        }
        return quantity;
    }
    const totalQuantity = getTotalQuantity();
    function getTotalPrice(list) {
        if (list) {
            let totalPrice = 0;
            let totalDiscount = 0;
            for (const product of cartList) {
                const { finalPrice, discountValue } = getPriceWithDiscount(
                    product.discountPercentage,
                    product.price
                );
                totalPrice += finalPrice * product.quantity;
                totalDiscount += discountValue * product.quantity;
            }
            return { totalPrice, totalDiscount };
        }
    }
    const handleFinishShopping = () => {
        if (userData.cash > total.totalPrice) {
            const currentCash = userData.cash;
            const cash = currentCash - total.totalPrice;
            toast.success("Спасибо! Ваш заказ обрабатывается");
            dispatch(
                updateUser({
                    cash,
                    userId: localStorageService.getUserId()
                })
            );
            dispatch(
                createOrder({
                    products: cartListIds,
                    totalPrice: total.totalPrice
                })
            );
            dispatch(clearCart());
        } else {
            toast.error("Недостаточно средств, пополните денежные средства");
        }
    };
    return (
        <>
            <h3>Ваш заказ</h3>
            <p>
                Количество товаров:
                <span className="fw-semibold fs-4"> {totalQuantity}</span>
            </p>
            <p>
                Итого к оплате:
                <span className="fw-semibold fs-4">
                    {" "}
                    {`${getConvertPrice(total.totalPrice)} ${
                        selectedCurrency.symbol
                    }`}
                </span>
            </p>
            <p>
                Экономия:
                <span className="fw-semibold fs-4">
                    {" "}
                    {`${getConvertPrice(total.totalDiscount)} ${
                        selectedCurrency.symbol
                    }`}
                </span>
            </p>
            <button
                onClick={handleFinishShopping}
                className="w-100 btn btn-success"
            >
                Купить
            </button>
        </>
    );
};

OrderForm.propTypes = {
    cartListIds: PropTypes.array,
    cartList: PropTypes.array
};

export default OrderForm;
