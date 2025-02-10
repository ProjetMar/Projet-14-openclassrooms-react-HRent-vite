import { useTable, usePagination } from 'react-table';
import { useMemo } from 'react';
import Columns from './columns';
import './style.css'

const PaginationTable = () => {
    const listeEmployee = JSON.parse(localStorage.getItem('employees') || '[]');

    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => listeEmployee, []);

    const { getTableProps, getTableBodyProps,
         headerGroups, page, nextPage, previousPage,
         canNextPage, canPreviousPage, pageOptions, gotoPage, setPageSize,
          state, prepareRow } = useTable({
        columns,
        data
    },usePagination);
    const {pageIndex, pageSize} = state
    return (
        <>
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
                {page.map((row) => {
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
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1}of{pageOptions.length}
                </strong>{' '}
            </span>
            <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map((pageSize)=>(
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }
            </select>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            {pageOptions.map((_, i) => (
               <button key={i} onClick={() => gotoPage(i)}>
                 {i + 1}
               </button>
            ))}
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        </div>
        </>
    );
};

export default PaginationTable;