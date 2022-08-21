import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import AdminPage from "../components/page/adminPage/adminPage";
import OrdersPanel from "../components/page/ordersPanel/ordersPanel";
import ProductsLoader from "../components/ui/hoc/productsLoader";
import { getIsAdmin } from "../store/users";

const Dashboard = () => {
    const isAdmin = useSelector(getIsAdmin());
    const params = useParams();
    const { page } = params;
    return (
        <ProductsLoader>
            {isAdmin ? (
                <>
                    {page === "orders" ? (
                        <OrdersPanel />
                    ) : (
                        <>
                            <AdminPage />
                            <Redirect to="/dashboard" />
                        </>
                    )}
                </>
            ) : (
                <Redirect to="/" />
            )}
        </ProductsLoader>
    );
};

export default Dashboard;
