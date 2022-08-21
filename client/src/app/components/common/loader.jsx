import React from "react";
import PropTypes from "prop-types";

const Loader = () => {
    return (
        <div
            className="spinner-border position-absolute top-50 start-50"
            role="status"
        >
            <span className="visually-hidden"></span>
        </div>
    );
};

Loader.propTypes = {
    clientY: PropTypes.number,
    clientX: PropTypes.number
};

export default Loader;
