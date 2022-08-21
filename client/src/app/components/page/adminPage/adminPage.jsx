import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductEditForm from "../../ui/forms/productEditForm";
import {
    getCurrentPage,
    getProductsList,
    getProductsListLength,
    loadProductsList,
    removeProduct
} from "../../../store/products";
import ProductsTable from "../../ui/productsTable";
import _ from "lodash";
import Pagination from "../../common/pagination";

const AdminPage = () => {
    const pageLimit = 20;
    const [editedProductId, setEditedProductId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const currentPage = useSelector(getCurrentPage());
    const totalCount = useSelector(getProductsListLength());
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const handlePageChange = (pageIndex) => {
        dispatch(
            loadProductsList({
                page: pageIndex,
                limit: pageLimit
            })
        );
    };
    const handleEdit = (id) => {
        setEditedProductId(id);
    };
    const handleRemove = (id) => {
        if (editedProductId === id) {
            clearForm();
        }
        dispatch(removeProduct(id));
    };
    const clearForm = () => {
        setEditedProductId(null);
    };
    const sortedProducts = _.orderBy(
        productsList,
        [sortBy.path],
        [sortBy.order]
    );
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSelect = (id) => {
        setSelectedProductId(id);
    };
    return (
        <div className="container pb-5">
            <div className="row">
                <div className="col-md-3">
                    <ProductEditForm
                        productId={editedProductId}
                        clearForm={clearForm}
                    />
                </div>
                <div className="col">
                    <ProductsTable
                        products={sortedProducts}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                        onSelect={handleSelect}
                        selectedRow={selectedProductId}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageLimit}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
