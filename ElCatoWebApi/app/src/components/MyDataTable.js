import React from 'react';
import DataTable from 'react-data-table-component';

function FilterComponent({ filterText, onFilter, onClear }) {
    return (
        <>
            <div className="join w-full">
                <div className='w-full'>
                    <div className='w-full'>
                        <input className="input input-bordered join-item w-full" placeholder="Search"
                            id="search" type="text" value={filterText} onChange={onFilter}
                        />
                    </div>
                </div>
                <button className="btn btn-error join-item" onClick={onClear}>X</button>
            </div>
        </>
    );
}

export default function MyDataTable(props) {
    
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = props.data?.filter(item => {
        return props.columns.some(
            c => {
                const val = typeof c.selector === 'function' ? c.selector(item) : item[c.selector];
                return val ? val.toString().toLowerCase().includes(filterText.toLowerCase()) : '';
            }
        );
    });


    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            title={props.title}
            columns={props.columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            theme='dark'
            onColumnOrderChange={cols => console.log(cols)}
        />
    );
}