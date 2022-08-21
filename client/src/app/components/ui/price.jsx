import React from "react";
import PropTypes from "prop-types";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";
import { useCurrencies } from "../../hooks/useCurrency";

const Price = ({ discount, price }) => {
    const { getConvertPrice, selectedCurrency } = useCurrencies();
    const convertedPrice = getConvertPrice(price);
    const { discountValue, finalPrice } = getPriceWithDiscount(
        discount,
        convertedPrice
    );
    return (
        <>
            {discount > 0 ? (
                <div className="d-flex gap-2 justify-content-center">
                    <span className="fw-bold text-nowrap">{`${finalPrice} ${selectedCurrency.symbol}`}</span>
                    <span className="text-decoration-line-through text-nowrap">{`${convertedPrice} ${selectedCurrency.symbol}`}</span>
                    <span className="fw-semibold text-danger text-nowrap">{`-${discountValue} ${selectedCurrency.symbol}`}</span>
                </div>
            ) : (
                <span className="fw-bold text-nowrap">{`${price} ${selectedCurrency.symbol}`}</span>
            )}
        </>
    );
};

Price.propTypes = {
    discount: PropTypes.number,
    price: PropTypes.number
};

export default Price;
