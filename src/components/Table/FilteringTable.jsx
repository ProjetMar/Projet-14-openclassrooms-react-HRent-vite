import { useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Columns from './columns';
import './style.css'
import GlobalFilter from './GlobalFilter';

const FilteringTable = () => {
    const listeEmployee = JSON.parse(localStorage.getItem('employees') || '[]');

    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => listeEmployee, []);

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow,
        page, nextPage, previousPage, canNextPage, canPreviousPage, 
        pageOptions, gotoPage, setPageSize, state, setGlobalFilter } = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy, usePagination);
    const {globalFilter, pageIndex, pageSize} = state
    return (
        <>
        <h1 className='Titre bg-gradient-to-r from-green-200 via-green-300 to-green-400'>Current Employees</h1>
        <div className='ConteneurDiv'>
            <div className='flex items-center justify-between w-full mb-3 mt-[50px]'>
                <div>
                    <label className='text-green-900 font-bold'>Show </label>
                    <select className='border border-green-900 text-green-900 font-bold' value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
                        {
                            [10,25,50].map((pageSize)=>(
                                <option className='border-green-900' key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))
                        }
                    </select>
                    <label className='text-green-900 font-bold'> entries</label>
                </div>
                <GlobalFilter filter={globalFilter} setfilter={setGlobalFilter} />
            </div>
            <table {...getTableProps()}>
            {/* En-tête */}
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...restHeaderProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                    return (
                                        <th key={key} {...restColumnProps}>
                                            {column.render('Header')}
                                            <span className='sortingFlechs'>
                                                <span style={{ color: column.isSorted && !column.isSortedDesc ? 'black' : 'gray' }}>▲</span>
                                                <span style={{ color: column.isSorted && column.isSortedDesc ? 'black' : 'gray' }}>▼</span>
                                            </span>
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
            <div className='flex items-center justify-between w-full mt-3'>
                <span className='text-green-900 font-bold'>
                  Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length} entries
                </span>            
                <div>
                    <button className='text-green-900 font-bold' onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
                    {pageOptions.map((_, i) => (
                    <button className='border border-green-900 ml-2 w-5 p-0 text-green-900 font-bold focus:bg-gray-300' key={i} onClick={() => gotoPage(i)}>
                        {i + 1}
                    </button>
                    ))}
                    <button className='ml-2 text-green-900 font-bold' onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
                </div>
            </div>    
        </div>
        <footer className='flex justify-center w-full mt-[50px]'>
          <Link className='text-center underline p-4 pr-[100%] pl-[100%] bg-gradient-to-r from-green-200 via-green-300 to-green-400 mt-3' to={`/`}>Home</Link>
        </footer>
        
        </>
    );
};

export default FilteringTable;