import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategoryById } from "../../store/categories";

const Category = ({ id }) => {
    const category = useSelector(getCategoryById(id));
    return (
        <div className="align-middle">
            <span>{category?.name}</span>
        </div>
    );
};
Category.propTypes = {
    id: PropTypes.string
};
export default Category;
