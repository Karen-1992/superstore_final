import React from "react";
import PropTypes from "prop-types";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Category from "./category";

const ProductsTable = ({
    products,
    onSort,
    selectedSort,
    onEdit,
    onRemove,
    onSelect,
    selectedRow,
    ...rest
}) => {
    const columns = {
        name: {
            path: "title",
            name: "Наименование",
            component: (product) => (
                <Link to={`/products/${product._id}`}>{product.title}</Link>
            )
        },
        category: {
            name: "Категория",
            path: "category",
            component: (product) => <Category id={product.category} />
        },
        stock: {
            path: "stock",
            name: "Остаток"
        },
        price: {
            path: "price",
            name: "Цена, $"
        },
        edit: {
            component: (product) => (
                <i
                    className="btn btn-secondary btn-sm bi bi-pencil"
                    onClick={() => onEdit(product._id)}
                ></i>
            )
        },
        remove: {
            component: (product) => (
                <i
                    className="btn btn-danger btn-sm bi bi-x-lg"
                    onClick={() => onRemove(product._id)}
                ></i>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
            classes="table table-hover table-sm"
            selectedRow={selectedRow}
            onSelect={onSelect}
        />
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    selectedRow: PropTypes.string
};

export default ProductsTable;
