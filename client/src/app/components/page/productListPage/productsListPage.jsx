import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import {
    getCurrentPage,
    getCurrentPath,
    getCurrentSort,
    getProductsList,
    getProductsListLength,
    loadProductsList
} from "../../../store/products";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import ProductsList from "../../ui/productsList";
import PropTypes from "prop-types";
import history from "../../../utils/history";
import ProductsListLine from "../../ui/productListLine";
import PageFormSwitcher from "../../common/pageFormSwitcher";
import localStorageService from "../../../services/localStorage.service";
import { pageForms } from "../../../constants/pageForms";

const ProductsListPage = ({ category }) => {
    const currentPage = useSelector(getCurrentPage());
    const [selectedCategory, setSelectedCategory] = useState(category || null);
    const [pageFormType, setPageFormType] = useState(
        localStorageService.getPageFormType() || pageForms[0].name
    );
    const pageLimit = 20;
    const order = useSelector(getCurrentSort());
    const categoriesList = useSelector(getCategories());
    const dispatch = useDispatch();
    const totalCount = useSelector(getProductsListLength());
    const products = useSelector(getProductsList());
    const path = useSelector(getCurrentPath());
    const handleTogglePageForm = (name) => {
        setPageFormType(name);
        localStorageService.setPageFormType(name);
    };
    const handlePageChange = (pageIndex) => {
        dispatch(
            loadProductsList({ page: pageIndex, limit: pageLimit, order, path })
        );
    };
    const handleCategorySelect = (item) => {
        if (selectedCategory?._id !== item._id) {
            setSelectedCategory(item);
            history.push(`/products/catalog/${item.name}`);
            dispatch(
                loadProductsList({
                    limit: pageLimit,
                    category: item._id,
                    order,
                    path
                })
            );
        }
    };
    const handleClearFilter = () => {
        if (category) {
            setSelectedCategory();
            history.push(`/products`);
            dispatch(
                loadProductsList({
                    page: currentPage,
                    limit: pageLimit,
                    order,
                    path
                })
            );
        }
    };
    const handleSort = () => {
        const newOrder = order && order === "asc" ? "desc" : "asc";
        dispatch(
            loadProductsList({
                limit: pageLimit,
                category: selectedCategory?._id,
                order: newOrder,
                path: "price"
            })
        );
    };
    if (products) {
        const filteredCount = selectedCategory ? products.length : totalCount;
        return (
            <div className="container pb-5">
                <div className="row g-0">
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        {categoriesList && (
                            <div className="d-flex flex-column flex-shrink">
                                <button
                                    className="btn btn-secondary mb-2"
                                    onClick={handleClearFilter}
                                >
                                    {" "}
                                    Очистить
                                </button>
                                <GroupList
                                    selectedItem={selectedCategory}
                                    items={categoriesList}
                                    onItemSelect={handleCategorySelect}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-8 px-3">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between pb-4">
                                <button
                                    onClick={handleSort}
                                    className="btn btn-secondary px-2"
                                >
                                    Сортировать по цене
                                    <i
                                        className={
                                            "ms-2 px-1 rounded-5 bi bi-caret-" +
                                            (order === "asc" ? "up" : "down")
                                        }
                                    ></i>
                                </button>
                                <p className="my-auto">{`Показано ${
                                    products.length
                                } из ${
                                    selectedCategory
                                        ? filteredCount
                                        : totalCount
                                }`}</p>
                                <div>
                                    <PageFormSwitcher
                                        forms={pageForms}
                                        onTogglePageForm={handleTogglePageForm}
                                        activeForm={pageFormType}
                                    />
                                </div>
                            </div>
                        </div>
                        {pageFormType === "grid" && (
                            <ProductsList items={products} />
                        )}
                        {pageFormType === "list" && (
                            <ProductsListLine items={products} />
                        )}
                        <div className="d-flex justify-content-center mt-3">
                            <Pagination
                                itemsCount={filteredCount}
                                pageSize={pageLimit}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

ProductsListPage.propTypes = {
    category: PropTypes.object
};

export default ProductsListPage;
