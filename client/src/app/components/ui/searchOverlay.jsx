import React from "react";
import PropTypes from "prop-types";
import ProductItemLine from "./productItemLine";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/cart";
import { toggleFavorite } from "../../store/favorites";
import history from "../../utils/history";
import { getIsLoggedIn } from "../../store/users";
import SearchStatus from "./searchStatus";

const SearchOverlay = ({
    items,
    isSearching,
    clearSearchQuery,
    searchQuery
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
        if (!isLoggedIn) {
            return clearSearchQuery();
        }
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
        if (!isLoggedIn) {
            return clearSearchQuery();
        }
    };
    const handleOpenProductPage = (productId) => {
        history.push(`products/${productId}`);
        clearSearchQuery();
    };
    return (
        <div className="d-flex flex-column shadow gap-2 px-5 pb-3">
            {isSearching ? (
                <>
                    <SearchStatus
                        length={items.length}
                        searchQuery={searchQuery}
                    />
                    {items &&
                        items.map((item) => (
                            <ProductItemLine
                                key={item._id}
                                {...item}
                                onAddToCart={() => handleAddToCart(item)}
                                onToggleFavorite={() =>
                                    handleToggleFavorite(item._id)
                                }
                                onOpenProductPage={() =>
                                    handleOpenProductPage(item._id)
                                }
                            />
                        ))}
                </>
            ) : (
                <p className="text-light">Поиск...</p>
            )}
        </div>
    );
};

SearchOverlay.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isSearching: PropTypes.bool,
    searchQuery: PropTypes.string,
    clearSearchQuery: PropTypes.func
};

export default SearchOverlay;
