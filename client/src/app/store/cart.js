import { createAction, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";
import history from "../utils/history";
import localStorageService from "../services/localStorage.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        cartRequested: (state) => {
            state.isLoading = true;
        },
        cartReceived: (state, action) => {
            if (action.payload) {
                state.entities = action.payload;
            } else {
                state.entities = [];
            }
            state.isLoading = false;
        },
        cartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productQuantityIncremented: (state, action) => {
            const index = state.entities.findIndex(
                (c) => c.productId === action.payload
            );
            state.entities[index].quantity += 1;
        },
        productQuantityDecremented: (state, action) => {
            const index = state.entities.findIndex(
                (c) => c.productId === action.payload
            );
            const prevQuantity = state.entities[index].quantity;
            if (prevQuantity > 1) {
                state.entities[index].quantity -= 1;
            }
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c.productId !== action.payload.productId
            );
        },
        cartCleared: (state) => {
            state.entities = [];
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    cartRequested,
    cartReceived,
    cartRequestFailed,
    productAdded,
    productRemoved,
    cartCleared,
    productQuantityIncremented,
    productQuantityDecremented
} = actions;

const addProductRequested = createAction("cart/addProductRequested");
const removeProductRequested = createAction("cart/removeProductRequested");
const clearCartRequested = createAction("cart/clearCartRequested");
const decrementQuantityRequested = createAction(
    "cart/decrementQuantityRequested"
);
const incrementQuantityRequested = createAction(
    "cart/incrementQuantityRequested"
);

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.get();
        dispatch(cartReceived(content.products));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const addProductToCart =
    ({ _id, stock }) =>
        async (dispatch) => {
            if (localStorageService.getUserId() === null) {
                return history.push("/login");
            }
            dispatch(addProductRequested());
            try {
                if (stock > 0) {
                    const { content } = await cartService.add({ productId: _id });
                    dispatch(productAdded(content));
                }
            } catch (error) {
                dispatch(cartRequestFailed(error.message));
            }
        };

export const removeProductFromCart = (productId) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const { content } = await cartService.remove({ productId });
        if (content === null) {
            return dispatch(productRemoved(productId));
        }
        dispatch(productRemoved({ content, productId }));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const decrementQuantity =
    ({ productId, quantity }) =>
        async (dispatch) => {
            dispatch(decrementQuantityRequested());
            try {
                if (quantity > 1) {
                    await cartService.update({
                        productId,
                        quantity: quantity - 1
                    });
                    dispatch(productQuantityDecremented(productId));
                }
            } catch (error) {
                dispatch(cartRequestFailed(error.message));
            }
        };
export const incrementQuantity =
    ({ productId, quantity, stock }) =>
        async (dispatch) => {
            dispatch(incrementQuantityRequested());
            try {
                if (stock > quantity) {
                    await cartService.update({
                        productId,
                        quantity: quantity + 1
                    });
                    dispatch(productQuantityIncremented(productId));
                }
            } catch (error) {
                dispatch(cartRequestFailed(error.message));
            }
        };
export const clearCart = () => async (dispatch) => {
    dispatch(clearCartRequested());
    try {
        await cartService.clear();
        dispatch(cartCleared());
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const getCartQuantity = () => (state) => {
    if (state.cart.entities) {
        return state.cart.entities.length;
    }
    return 0;
};
export const getCartList = () => (state) => state.cart.entities;
export const getCartLoadingStatus = () => (state) => state.cart.isLoading;
export const getCartProductById = (id) => (state) => {
    if (state.cart.entities) {
        return state.cart.entities.find((p) => p.productId === id);
    }
};

export default cartReducer;
