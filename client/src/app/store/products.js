import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const initialState = {
    entities: null,
    length: null,
    currentPage: 1,
    category: null,
    isLoading: true,
    sort: null,
    error: null,
    path: null,
    dataLoaded: false
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        productsReceived: (state, action) => {
            const { list, length, page, category, order, path } =
                action.payload;
            state.entities = list;
            state.length = length;
            state.currentPage = +page;
            state.category = category;
            state.sort = order;
            state.path = path;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productCreated: (state, action) => {
            state.entities.unshift(action.payload);
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: ProductsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    productRemoved,
    productUpdateSuccessed,
    productCreated
} = actions;

const productRemoveRequested = createAction("products/productRemoveRequested");
const removeProductFailed = createAction("products/removeProductFailed");
const productCreateRequested = createAction("products/productCreateRequested");
const productCreateFailed = createAction("products/productCreateFailed");
const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");

export const loadProductsList = (params) => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get(params);
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const removeProduct = (payload) => async (dispatch) => {
    dispatch(productRemoveRequested());
    try {
        const { content } = await productService.remove(payload);
        if (!content) {
            return dispatch(productRemoved(payload));
        }
        dispatch(productRemoved({ content, payload }));
    } catch (error) {
        dispatch(removeProductFailed(error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdateSuccessed(content));
    } catch (error) {
        dispatch(productCreateFailed(error.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested());
    try {
        const { content } = await productService.create(payload);
        dispatch(productCreated(content));
    } catch (error) {
        dispatch(productUpdateFailed(error.message));
    }
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductsListLength = () => (state) => state.products.length;
export const getCurrentPage = () => (state) => state.products.currentPage;
export const getCurrentCategory = () => (state) => state.products.category;
export const getCurrentSort = () => (state) => state.products.sort;
export const getCurrentPath = () => (state) => state.products.path;

export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === productId);
    }
};

export const getDataStatus = () => (state) => state.products.dataLoaded;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export default ProductsReducer;
