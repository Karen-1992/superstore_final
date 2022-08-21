import React from "react";
import PropTypes from "prop-types";

const Badge = ({ title, color }) => {
    return (
        <span className={`badge text-white p-2 rounded bg-${color}`}>
            {title}
        </span>
    );
};

Badge.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string
};

export default Badge;
