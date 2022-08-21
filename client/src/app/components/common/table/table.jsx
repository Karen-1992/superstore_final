import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({
    onSort,
    selectedSort,
    columns,
    data,
    children,
    classes,
    selectedRow,
    onSelect
}) => {
    return (
        <table className={classes}>
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data, selectedRow, onSelect }} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    onSelect: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
    classes: PropTypes.string,
    selectedRow: PropTypes.string
};

export default Table;
