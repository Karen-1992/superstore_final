import React from "react";
import PropTypes from "prop-types";

const InStockStatus = ({ quantity }) => {
    return (
        <>
            <div
                style={{
                    height: "10px",
                    width: "10px"
                }}
                className={
                    "bg rounded-5 d-block my-auto mx-1 bg-" +
                    (quantity > 0 ? "success" : "danger")
                }
            ></div>
            <span>{quantity > 0 ? "В наличии" : "Нет в наличии"}</span>
        </>
    );
};

InStockStatus.propTypes = {
    quantity: PropTypes.number
};

export default InStockStatus;
