import React from "react";
import PropTypes from "prop-types";
import FavoritesPage from "../components/page/favoritesPage/favoritesPage";
import Reviews from "../components/page/reviewsPage/reviews";
import UserOrders from "../components/page/userOrders/userOrders";
import LogOut from "../layouts/logOut";
import EditUserForm from "../components/ui/forms/editUserForm";
import UserCard from "../components/ui/userCard";

const ProfileContentProxy = ({ route, isEdit }) => {
    const contentByType = {
        personal: !isEdit ? <UserCard /> : <EditUserForm />,
        favorites: <FavoritesPage />,
        reviews: <Reviews />,
        orders: <UserOrders />,
        logout: <LogOut />
    };
    const CurrentProfileContent = () => contentByType[route];
    return <CurrentProfileContent />;
};

ProfileContentProxy.propTypes = {
    route: PropTypes.string,
    isEdit: PropTypes.bool
};

export default ProfileContentProxy;
