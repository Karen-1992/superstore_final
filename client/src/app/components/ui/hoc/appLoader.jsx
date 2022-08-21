import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadUserData
} from "../../../store/users";
import {
    getFavoriteLoadingStatus,
    loadFavoritetList
} from "../../../store/favorites";
import { getCartLoadingStatus, loadCartList } from "../../../store/cart";
import Loader from "../../common/loader";
import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../../store/categories";
import { getOrdersLoadingStatus, loadOrdersList } from "../../../store/order";
import localStorageService from "../../../services/localStorage.service";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userId = localStorageService.getUserId();
    const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const favoritesLoadingStatus = useSelector(getFavoriteLoadingStatus());
    const cartLoadingStatus = useSelector(getCartLoadingStatus());
    const ordersLoadingStatus = useSelector(getOrdersLoadingStatus());
    const loadingStatus =
        userLoadingStatus &&
        cartLoadingStatus &&
        favoritesLoadingStatus &&
        categoriesLoadingStatus &&
        ordersLoadingStatus;
    useEffect(() => {
        dispatch(loadCategoriesList());
        if (isLoggedIn) {
            dispatch(loadUserData());
            dispatch(loadCartList());
            dispatch(loadFavoritetList());
            dispatch(loadOrdersList({ userId }));
        }
    }, [isLoggedIn]);
    if (loadingStatus) {
        return <Loader />;
    }
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
