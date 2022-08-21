import React from "react";
import CategoriesList from "../components/ui/categoriesList";
import MainProductsGroup from "../components/ui/mainProductsGroup";

const Main = () => {
    return (
        <div className="container pb-5">
            <MainProductsGroup
                params={{ limit: 4, order: "desc", path: "createdAt" }}
                title="Новинки"
            />
            <MainProductsGroup
                params={{ limit: 4, order: "desc", path: "discountPercentage" }}
                title="Суперцена"
            />
            <div className="my-5 px-3">
                <h2>Категории</h2>
                <div className="row row-cols-2 row-cols-lg-5 row-cols-sm-4 g-3 g-lg-4">
                    <CategoriesList />
                </div>
            </div>
        </div>
    );
};

export default Main;
