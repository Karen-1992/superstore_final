import React from "react";
import PropTypes from "prop-types";

const RatingStars = ({ onSetRating, value, role }) => {
    const handleSetRating = (rating) => {
        if (role === "button") {
            onSetRating(rating);
        }
    };
    const stars = [1, 2, 3, 4, 5];
    return (
        <div>
            {stars.map((r, i) => (
                <i
                    key={r}
                    role={role}
                    onClick={() => handleSetRating(i)}
                    className={"bi bi-star" + (value >= r ? "-fill" : "")}
                ></i>
            ))}
        </div>
    );
};

RatingStars.defaultProps = {
    role: "button"
};

RatingStars.propTypes = {
    value: PropTypes.number,
    role: PropTypes.string,
    onSetRating: PropTypes.func
};

export default RatingStars;
