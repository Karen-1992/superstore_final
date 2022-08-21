import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppLoader from "./components/ui/hoc/appLoader";
import ProtectedRoute from "./components/common/protectedRoute";
import routes from "./routes/app.routes";
import Header from "./components/ui/header/header";
import Footer from "./components/ui/footer";
import { ToastContainer } from "react-toastify";
import { CurrenciesProvider } from "./hooks/useCurrency";
import { ProductProvider } from "./hooks/useProduct";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        if (prop.path) {
            if (prop.isPrivate) {
                return (
                    <ProtectedRoute
                        path={prop.path}
                        component={prop.component}
                        exact
                        key={key}
                    />
                );
            } else {
                return (
                    <Route
                        path={prop.path}
                        component={prop.component}
                        exact
                        key={key}
                    />
                );
            }
        }
        return null;
    });
};

function App() {
    return (
        <div className="container bg-light min-vh-100 position-relative p-0 pb-5">
            <AppLoader>
                <CurrenciesProvider>
                    <ProductProvider>
                        <Header />
                        <div className="my-5 p-0">
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect to="/" />
                            </Switch>
                        </div>
                        <Footer />
                    </ProductProvider>
                </CurrenciesProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
