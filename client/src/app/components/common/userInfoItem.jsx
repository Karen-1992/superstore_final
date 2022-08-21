import React from "react";
import PropTypes from "prop-types";

const UserInfoItem = ({ value, title }) => {
    return (
        <div className="d-flex gap-3">
            <span className="fw-light">{title}:</span>
            <p className="fw-semibold">{value}</p>
        </div>
    );
};

UserInfoItem.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
};

export default UserInfoItem;
