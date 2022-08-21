import React from "react";
import PropTypes from "prop-types";

const SearchQuerry = ({ onSearchQuery, onToggleSearching }) => {
    return (
        <div className="input-group-lg w-100 align-self-center px-5 d-flex">
            <input
                onChange={(e) => onSearchQuery(e)}
                className="form-control"
                type="search"
                placeholder="Введите наименование товара"
            />
            <button className="btn btn-danger" onClick={onToggleSearching}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
};

SearchQuerry.propTypes = {
    onSearchQuery: PropTypes.func,
    onToggleSearching: PropTypes.func
};

export default SearchQuerry;
