import httpService from "./http.service";

const orderEndpoint = "order/";

const orderService = {
    get: async (payload) => {
        const [key, id] = Object.entries(payload)[0];
        const { data } = await httpService.get(orderEndpoint, {
            params: {
                orderBy: key,
                equalTo: `${id}`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            orderEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeOrder: async (orderId) => {
        const { data } = await httpService.delete(orderEndpoint + orderId);
        return data;
    },
    add: async (payload) => {
        const { data } = await httpService.post(orderEndpoint, payload);
        return data;
    }
};
export default orderService;
