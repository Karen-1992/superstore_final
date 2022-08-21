import React from "react";
import { getOrderStatus } from "../../utils/getOrderStatus";
import PropTypes from "prop-types";

const OrderStatus = ({ status }) => {
    function getClasees(status) {
        let classes = "p-1 rounded text-light text-nowrap bg-";
        if (status === "pending") classes += "secondary";
        if (status === "completed") classes += "success";
        if (status === "canceled") classes += "danger";
        return classes;
    }
    return (
        <div>
            <span className={getClasees(status)}>{getOrderStatus(status)}</span>
        </div>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.string.isRequired
};

export default OrderStatus;
