import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartQuantity } from "../../../store/cart";
import { getFavoriteQuantity } from "../../../store/favorites";
import { getIsAdmin, getIsLoggedIn } from "../../../store/users";
import ImageComponent from "../../common/imageComponent";
import logo from "../../../assets/images/superstore.png";
import NavProfile from "../navProfile";
import NavItem from "../../common/navItem";
import PropTypes from "prop-types";
import { getPendingOrdersQuantity } from "../../../store/order";
import CurrencySwitcher from "../../common/currencySwitcher";

const NavBar = ({ onToggleSearching }) => {
    const cartQuantity = useSelector(getCartQuantity());
    const favoritesQuantity = useSelector(getFavoriteQuantity());
    const pendingOrdersQuantity = useSelector(getPendingOrdersQuantity());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getIsAdmin());
    return (
        <div>
            <nav className="border p-3 pb-1">
                <div className="d-flex flex-wrap justify-content-between">
                    <div className="d-flex align-self-center">
                        <Link to="/">
                            <ImageComponent
                                height="100px"
                                width="170px"
                                src={logo}
                            />
                        </Link>
                        <div className="d-flex align-self-center gap-3">
                            {isLoggedIn && isAdmin && (
                                <>
                                    <NavItem
                                        iconClasses="bi bi-gear"
                                        title="Админ-панель"
                                        path="/dashboard"
                                    />
                                    <NavItem
                                        iconClasses="bi bi-cart-check"
                                        title="Панель заказов"
                                        path="/dashboard/orders"
                                        quantity={pendingOrdersQuantity}
                                    />
                                </>
                            )}
                        </div>
                        <div
                            className="my-auto px-3"
                            onClick={onToggleSearching}
                        >
                            <NavItem
                                iconClasses="bi bi-search"
                                title="Поиск"
                                path={"/"}
                            />
                        </div>
                    </div>
                    <div className="d-flex align-self-center gap-3">
                        <CurrencySwitcher />
                        <NavItem
                            iconClasses="bi bi-card-list"
                            title="Каталог"
                            path="/products"
                        />
                        {isLoggedIn ? (
                            <div className="d-flex gap-3">
                                <NavItem
                                    quantity={favoritesQuantity}
                                    iconClasses="bi bi-heart"
                                    title="Избранное"
                                    path="/cabinet/favorites"
                                />
                                <NavItem
                                    quantity={cartQuantity}
                                    iconClasses="bi bi-cart3"
                                    title="Корзина"
                                    path="/cart"
                                />
                                <NavProfile />
                            </div>
                        ) : (
                            <NavItem
                                iconClasses="bi bi-person"
                                title="Вход"
                                path="/login"
                            />
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

NavBar.propTypes = {
    onToggleSearching: PropTypes.func
};

export default NavBar;
