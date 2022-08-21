import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns, selectedRow, onSelect }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr
                    key={item._id}
                    onClick={() => onSelect(item._id)}
                    className={
                        (selectedRow === item._id ? "table-active " : "") + ""
                    }
                >
                    {Object.keys(columns).map((column) => (
                        <td key={column} className="align-middle">
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    selectedRow: PropTypes.string
};

export default TableBody;
