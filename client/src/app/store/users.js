import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true;
        },
        userReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = {};
            }
            state.entities = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
        },
        userUpdateSuccessed: (state, action) => {
            state.entities = {
                ...state.entities,
                ...action.payload
            };
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    userRequested,
    userReceived,
    userRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdateSuccessed
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const login =
    ({ payload, redirect }) =>
        async (dispatch) => {
            const { email, password } = payload;
            dispatch(authRequested());
            try {
                const data = await authService.login({ email, password });
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({ userId: data.userId }));
                history.push(redirect);
            } catch (error) {
                const { code, message } = error.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(error.message));
                }
            }
        };

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/");
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    localStorageService.removeUserData();
    localStorageService.removePageFormType();
    localStorageService.removeCurrency();
    dispatch(userLoggedOut());
    history.push("/");
};

export const loadUserData = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(userReceived(content));
    } catch (error) {
        dispatch(userRequestFailed(error.message));
    }
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccessed(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const getCurrentUserData = () => (state) => {
    return state.users.entities;
};

export const getIsAdmin = () => (state) => {
    if (state.users.entities) {
        const isAdmin = state.users.entities.role === "admin";
        return isAdmin;
    }
    return false;
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUserLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => {
    if (state.users.auth) {
        return state.users.auth.userId;
    }
};
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
