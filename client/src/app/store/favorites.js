import { createAction, createSlice } from "@reduxjs/toolkit";
import favoriteService from "../services/favorite.service";
import history from "../utils/history";
import localStorageService from "../services/localStorage.service";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        favoritesRequested: (state) => {
            state.isLoading = true;
        },
        favoritesReceived: (state, action) => {
            if (action.payload) {
                state.entities = action.payload;
            } else {
                state.entities = [];
            }
            state.isLoading = false;
        },
        favoritesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        favoriteToggled: (state, action) => {
            const item = state.entities.find(
                (f) => f.productId === action.payload.productId
            );
            if (item) {
                state.entities = state.entities.filter(
                    (f) => f.productId !== action.payload.productId
                );
            } else {
                state.entities.push(action.payload);
            }
        },
        favoritesCleared: (state) => {
            state.entities = [];
        }
    }
});

const { reducer: favoritesReducer, actions } = favoriteSlice;
const {
    favoritesRequested,
    favoritesReceived,
    favoritesRequestFailed,
    favoriteToggled,
    favoritesCleared
} = actions;

const toggleFavoriteRequested = createAction(
    "favorite/toggleFavoriteRequested"
);
const toggleFavoriteFailed = createAction("favorite/toggleFavoriteFailed");
const clearFavoriteRequested = createAction("favorite/clearfavoriteRequested");
const clearFavoriteFailed = createAction("favorite/clearFavoriteFailed");

export const loadFavoritetList = () => async (dispatch) => {
    dispatch(favoritesRequested());
    try {
        const { content } = await favoriteService.get();
        dispatch(favoritesReceived(content.products));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const toggleFavorite = (productId) => async (dispatch) => {
    const userId = localStorageService.getUserId();
    if (userId === null) {
        return history.push("/login");
    }
    dispatch(toggleFavoriteRequested());
    try {
        await favoriteService.toggle({ productId });
        dispatch(favoriteToggled({ productId }));
    } catch (error) {
        dispatch(toggleFavoriteFailed(error.message));
    }
};

export const clearFavorite = () => async (dispatch) => {
    dispatch(clearFavoriteRequested());
    try {
        await favoriteService.clear();
        dispatch(favoritesCleared());
    } catch (error) {
        dispatch(clearFavoriteFailed(error.message));
    }
};
export const getFavoriteQuantity = () => (state) => {
    if (state.favorites.entities) {
        return state.favorites.entities.length;
    }
    return 0;
};
export const getFavoriteList = () => (state) => state.favorites.entities;
export const getFavoriteLoadingStatus = () => (state) =>
    state.favorites.isLoading;
export const getIsFavorite = (id) => (state) => {
    if (state.favorites.entities) {
        return state.favorites.entities.some((f) => f.productId === id);
    }
};

export default favoritesReducer;
