import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import cartReducer from "./cart";
import favoritesReducer from "./favorites";
import commentsReducer from "./comments";
import ordersReducer from "./order";

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    orders: ordersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
