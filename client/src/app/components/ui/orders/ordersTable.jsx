import React from "react";
import PropTypes from "prop-types";
import Table from "../../common/table";
import OrderStatus from "../../common/orderStatus";
import User from "../../common/user";
import { getIsAdmin } from "../../../store/users";
import { useSelector } from "react-redux";
import OrderButtons from "./orderButtons";
import { getDate } from "../../../utils/getDate";
import OrdersList from "./ordersList";
import Price from "../price";

const OrdersTable = ({
    orders,
    onSort,
    selectedSort,
    onCancel,
    onAccept,
    onRemove,
    onSelect,
    selectedRow,
    ...rest
}) => {
    const isAdmin = useSelector(getIsAdmin());
    const columns = {
        date: {
            path: "created_at",
            name: "Время заказа",
            component: (order) => <span>{getDate(order.created_at)}</span>
        },
        status: {
            name: "Статус",
            path: "status",
            component: (order) => <OrderStatus status={order.status} />
        },
        totalPrice: {
            path: "totalPrice",
            name: "Стоимость",
            component: (order) => <Price price={order.totalPrice} />
        },
        user: {
            path: "userId",
            name: isAdmin ? "Покупатель" : "",
            component: (order) => {
                if (isAdmin) return <User userId={order.userId} />;
            }
        },
        products: {
            name: "Товары",
            component: (order) => <OrdersList productsIds={order.products} />
        },
        cancel: {
            component: (order) => (
                <OrderButtons
                    order={order}
                    onAccept={onAccept}
                    onCancel={onCancel}
                    onRemove={onRemove}
                />
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={orders}
            classes="table table-hover table-sm"
            selectedRow={selectedRow}
            onSelect={onSelect}
        />
    );
};

OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    onAccept: PropTypes.func,
    onSelect: PropTypes.func,
    selectedSort: PropTypes.object,
    selectedRow: PropTypes.string
};

export default OrdersTable;
