import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadProductsList } from "../../../store/products";
import PropTypes from "prop-types";
import Loader from "../../common/loader";
import { useParams } from "react-router-dom";
import { getCategoryByName } from "../../../store/categories";

const ProductsLoader = ({ children }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { category } = params;
    const categoryItem = useSelector(getCategoryByName(category));
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        dispatch(loadProductsList({ category: categoryItem?._id }));
    }, [category]);
    if (!dataStatus) {
        return <Loader />;
    }
    return children;
};

ProductsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductsLoader;
