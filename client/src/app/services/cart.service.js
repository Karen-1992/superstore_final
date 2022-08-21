import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const cartEndpoint = "cart/";

const cartService = {
    get: async () => {
        const { data } = await httpService.get(
            cartEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(
            cartEndpoint +
                localStorageService.getUserId() +
                `/${payload.productId}`
        );
        return data;
    },
    clear: async () => {
        const { data } = await httpService.delete(
            cartEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    add: async (payload) => {
        const { data } = await httpService.post(
            cartEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            cartEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};
export default cartService;
