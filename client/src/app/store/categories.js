import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";
import isOutDated from "../utils/isOutDated";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        dataLoaded: false,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.dataLoaded = true;
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
    actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutDated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoriesService.get();
            dispatch(categoriesReceived(content));
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoryById = (id) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.find((p) => p._id === id);
    }
};
export const getCategoryByName = (name) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.find((p) => p.name === name);
    }
};
export const getDataStatus = () => (state) => state.users.dataLoaded;

export default categoriesReducer;
