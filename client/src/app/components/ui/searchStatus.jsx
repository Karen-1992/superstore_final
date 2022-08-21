import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length, searchQuery }) => {
    const renderPhrase = (number) => {
        if (number === 0) {
            return "ничего не найдено";
        }
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return `найдено ${length} товаров`;
        }
        if (lastOne === 1) return `найден ${length} товар`;
        if ([2, 3, 4].indexOf(lastOne) >= 0) return `найдено ${length} товара`;
        return `найдено ${length} товаров`;
    };
    return (
        <>
            <span className="fw-light text-light" role="button">
                {`По запросу "${searchQuery}" ${renderPhrase(length)}`}
            </span>
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number,
    searchQuery: PropTypes.string
};

export default SearchStatus;
