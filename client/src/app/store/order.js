import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        ordersRequested: (state) => {
            state.isLoading = true;
        },
        ordersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        ordersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        orderCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        orderUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex(
                    (order) => order._id === action.payload._id
                )
            ] = action.payload;
        },
        orderRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (order) => order._id !== action.payload
            );
        }
    }
});

const { reducer: ordersReducer, actions } = ordersSlice;
const {
    ordersRequested,
    ordersReceived,
    ordersRequestFailed,
    orderCreated,
    orderUpdated,
    orderRemoved
} = actions;

const addOrderRequested = createAction("orders/addOrderRequested");
const updateOrderRequested = createAction("orders/updateOrderRequested");
const removeOrderRequested = createAction("orders/removeOrderRequested");

export const loadOrdersList = (payload) => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        const { content } = await orderService.get(payload);
        dispatch(ordersReceived(content));
    } catch (error) {
        dispatch(ordersRequestFailed(error.message));
    }
};
export const createOrder = (payload) => async (dispatch) => {
    dispatch(addOrderRequested());
    try {
        const { content } = await orderService.add(payload);
        dispatch(orderCreated(content));
    } catch (error) {
        dispatch(ordersRequestFailed(error.message));
    }
};
export const updateOrder = (payload) => async (dispatch) => {
    dispatch(updateOrderRequested());
    try {
        const { content } = await orderService.update(payload);
        dispatch(orderUpdated(content));
    } catch (error) {
        dispatch(ordersRequestFailed(error.message));
    }
};

export const removeOrder = (orderId) => async (dispatch) => {
    dispatch(removeOrderRequested());
    try {
        const { content } = await orderService.removeOrder(orderId);
        if (!content) {
            dispatch(orderRemoved(orderId));
        }
    } catch (error) {
        dispatch(ordersRequestFailed(error.message));
    }
};

export const getOrders = () => (state) => state.orders.entities;
export const getPendingOrdersQuantity = () => (state) => {
    if (state.orders.entities) {
        return state.orders.entities.filter(
            (order) => order.status === "pending"
        ).length;
    }
    return null;
};
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;

export default ordersReducer;
