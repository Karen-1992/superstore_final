import React, { useState } from "react";
import { orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, removeOrder, updateOrder } from "../../../store/order";
import {
    getCurrentUserData,
    getIsAdmin,
    updateUser
} from "../../../store/users";
import OrdersTable from "../../ui/orders/ordersTable";
import Loader from "../../common/loader";
import { Link } from "react-router-dom";

const UserOrders = () => {
    const dispatch = useDispatch();
    const userData = useSelector(getCurrentUserData());
    const isAdmin = useSelector(getIsAdmin());
    const orders = useSelector(getOrders());
    const [sortBy, setSortBy] = useState({ path: "created_at", order: "asc" });
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const sortedOrders = orderBy(orders, [sortBy.path], [sortBy.order]);
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSelect = (id) => {
        setSelectedOrderId(id);
    };
    const handleRemove = async (id) => {
        if (isAdmin) {
            dispatch(removeOrder(id));
        }
    };
    const handleCancel = async (order) => {
        dispatch(
            updateOrder({
                ...order,
                status: "canceled"
            })
        );
        const currentCash = userData.cash;
        const cash = currentCash + order.totalPrice;
        dispatch(
            updateUser({
                cash,
                userId: userData._id
            })
        );
    };
    return (
        <>
            {orders ? (
                <>
                    {orders.length > 0 ? (
                        <>
                            <h4 className="mb-3">Мои заказы</h4>
                            <OrdersTable
                                orders={sortedOrders}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onCancel={handleCancel}
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                                selectedRow={selectedOrderId}
                            />
                        </>
                    ) : (
                        <>
                            <h4>У вас еще нет заказов</h4>
                            <div>
                                Чтобы совершить заказ, выберите нужный Вам товар
                                из
                                <Link to="/products">
                                    {" "}
                                    каталога интернет-магазина
                                </Link>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UserOrders;
