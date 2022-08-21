import CartPage from "../components/page/cartPage/cartPage";
import Dashboard from "../layouts/dashboard";
import Login from "../layouts/login";
import LogOut from "../layouts/logOut";
import Main from "../layouts/main";
import Products from "../layouts/products";
import UserCabinet from "../layouts/userCabinet";

const routes = [
    {
        path: "/products/:productId?",
        component: Products,
        isPrivate: false
    },
    {
        path: "/products/catalog/:category?",
        component: Products,
        isPrivate: false
    },
    {
        path: "/logout",
        component: LogOut,
        isPrivate: false
    },
    {
        path: "/login/:type?",
        component: Login,
        isPrivate: false
    },
    {
        path: "/cabinet/:type?/:edit?",
        component: UserCabinet,
        isPrivate: true
    },
    {
        path: "/cart",
        component: CartPage,
        isPrivate: true
    },
    {
        path: "/dashboard/:page?",
        component: Dashboard,
        isPrivate: true
    },
    {
        path: "/",
        component: Main,
        isPrivate: false
    }
];

export default routes;
