import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const favoriteEndpoint = "favorites/";

const favoriteService = {
    get: async () => {
        const { data } = await httpService.get(
            favoriteEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    toggle: async (payload) => {
        const { data } = await httpService.post(
            favoriteEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    },
    clear: async () => {
        const { data } = await httpService.delete(
            favoriteEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};
export default favoriteService;
