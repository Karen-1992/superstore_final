import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../store/users";

const OrderButtons = ({ order, onCancel, onRemove, onAccept }) => {
    const isAdmin = useSelector(getIsAdmin());
    return (
        <div className="d-flex flex-column">
            {order.status === "pending" ? (
                <div className="d-flex flex-column gap-2">
                    <button
                        className="btn btn-danger"
                        onClick={() => onCancel(order)}
                    >
                        Отменить
                    </button>
                    {isAdmin && (
                        <button
                            className="btn btn-success"
                            onClick={() => onAccept(order)}
                        >
                            Принять
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {isAdmin && (
                        <button
                            className="btn btn-danger"
                            onClick={() => onRemove(order._id)}
                        >
                            Удалить
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

OrderButtons.propTypes = {
    order: PropTypes.object,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    onAccept: PropTypes.func
};

export default OrderButtons;
