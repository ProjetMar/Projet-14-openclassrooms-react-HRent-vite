import { useTable } from 'react-table';
import { useMemo } from 'react';
import Columns from './columns';
import './style.css'

const BasicTable = () => {
    const listeEmployee = JSON.parse(localStorage.getItem('employees') || '[]');

    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => listeEmployee, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    });

    return (
        <table {...getTableProps()}>
            {/* En-tête */}
            <thead>
                {headerGroups.map((headerGroup) => {
                    const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={key} {...restHeaderProps}>
                            {headerGroup.headers.map((column) => {
                                const { key, ...restColumnProps } = column.getHeaderProps();
                                return (
                                    <th key={key} {...restColumnProps}>
                                        {column.render('Header')}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>

            {/* Corps */}
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                        <tr key={key} {...restRowProps}>
                            {row.cells.map((cell) => {
                                const { key, ...restCellProps } = cell.getCellProps();
                                return (
                                    <td key={key} {...restCellProps}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default BasicTable;
