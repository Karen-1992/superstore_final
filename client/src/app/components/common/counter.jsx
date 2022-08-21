import React from "react";
import PropTypes from "prop-types";

const Counter = ({ quantity, onIncrement, onDecrement }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-row">
                <button
                    className="btn btn-outline-danger btn-sm my-2"
                    disabled={quantity === 1}
                    onClick={onDecrement}
                >
                    -
                </button>
                <div className="d-flex px-2 mx-2">
                    <span className="my-auto">{quantity}</span>
                </div>
                <button
                    className="btn btn-outline-success btn-sm my-2"
                    onClick={onIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );
};

Counter.propTypes = {
    quantity: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
};

export default Counter;
