import React from "react";
import PropTypes from "prop-types";

const ClearButton = ({ label, onClick, classes }) => {
    return (
        <span className={classes} onClick={onClick} role="button">
            {label}
            <i className="bi bi-trash-fill px-1"></i>
        </span>
    );
};

ClearButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.string
};

export default ClearButton;
