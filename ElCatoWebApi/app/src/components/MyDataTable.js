import { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';

function FilterComponent({ filterText, onFilter }) {
    return (
        <>
            <div className='w-full mt-5'>
                <input className="input join-item w-full" placeholder="Search"
                    id="search" type="text" value={filterText} onChange={onFilter}
                />
            </div>
        </>
    );
}

export default function MyDataTable(props) {

    const [filterText, setFilterText] = useState('');
    const filteredItems = props.data?.filter(item => {
        return props.columns.some(
            c => {
                const val = typeof c.selector === 'function' ? c.selector(item) : item[c.selector];
                return val ? val.toString().toLowerCase().includes(filterText.toLowerCase()) : '';
            }
        );
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let items = filteredItems?.slice((page - 1) * pageSize, page * pageSize);
        setRows(items?.map((item, i) => (
            <tr key={i}>
                {props.columns.map((col, j) => (
                    <td key={j}>{typeof col.selector === 'function' ? col.selector(item) : col.cell(item)}</td>
                ))}
            </tr>
        )));
    }, [filterText, page, pageSize, props.data]);

    useEffect(() => {
        setPage(1);
    }, [filterText]);

    return (
        <>
            <div className='flex flex-row justify-between w-full mt-5'>
                <div>
                    <select className="select select-bordered w-full max-w-xs"
                        value={pageSize ? pageSize : ""} onChange={e => setPageSize(e.target.value)}
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                </div>
                <div className="join">
                    <button className="join-item btn"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >«</button>
                    <select className="join-item select"
                        value={page ? page : ""} onChange={e => setPage(e.target.value)}
                    >
                        {filteredItems && Array.from(Array(Math.ceil(filteredItems?.length / pageSize)).keys()).map(i => (
                            <option key={i} value={i + 1}>Page {i + 1}</option>
                        ))}
                    </select>
                    <button className="join-item btn"
                        onClick={() => setPage(page + 1)}
                        disabled={filteredItems == null || filteredItems?.length < page * pageSize}
                    >»</button>
                </div>
            </div>
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
            <div className="overflow-x-auto">
                <table className="table bg-base-300">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-100'>
                            {props.columns.map((col, i) => (
                                <th className='min-w-[100px]' key={i}>{col.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </>
    );
}