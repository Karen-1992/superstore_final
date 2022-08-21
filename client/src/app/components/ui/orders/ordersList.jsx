import React from "react";
import PropTypes from "prop-types";
import OrderItem from "./orderItem";
import history from "../../../utils/history";

const OrdersList = ({ productsIds }) => {
    const handleClick = (productId) => {
        history.push(`/products/${productId}`);
    };
    return (
        <div className="d-flex flex-column gap-2">
            {productsIds.map((p) => (
                <OrderItem key={p._id} {...p} onClick={handleClick} />
            ))}
        </div>
    );
};

OrdersList.propTypes = {
    productsIds: PropTypes.array
};

export default OrdersList;
