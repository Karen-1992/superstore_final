import React from "react";
import PropTypes from "prop-types";

const CommentsStatus = ({ length, onOpenComments }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "отзывов";
        }
        if (lastOne === 1) return "отзыв";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "отзыва";
        return "отзыв";
    };
    return (
        <span
            onClick={onOpenComments}
            className="fw-light text-danger"
            role="button"
        >
            {length > 0
                ? `${length + " " + renderPhrase(length)}`
                : "Оставьте отзыв первым!"}
        </span>
    );
};
CommentsStatus.propTypes = {
    length: PropTypes.number,
    onOpenComments: PropTypes.func
};

export default CommentsStatus;
