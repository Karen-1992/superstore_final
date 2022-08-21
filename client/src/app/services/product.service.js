import httpService from "./http.service";

const productEndpoint = "products/";

const productService = {
    get: async (params) => {
        const { data } = await httpService.get(productEndpoint, {
            params
        });
        return data;
    },
    getOneProduct: async (productId) => {
        const { data } = await httpService.get(productEndpoint + productId);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(productEndpoint, payload);
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(productEndpoint + payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default productService;
