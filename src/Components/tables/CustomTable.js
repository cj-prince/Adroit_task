import React,{ useMemo,useState } from 'react';
import { useTable,useFilters,usePagination } from 'react-table';
import styled from 'styled-components';


function CustomTable(props) {
  const data = useMemo(() => props.data || []);

  const columns = useMemo(() => props.columns || []);

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("col3", value);
    setFilterInput(value);
  }

  const tableInstance = useTable({
    columns,
    data
  },useFilters,usePagination);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,setFilter, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage,
  nextPage, previousPage, state: { pageIndex }, } = tableInstance;

  return (
    <>
    <InputDiv>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search title"}
      />
    </InputDiv>
      
      <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </TableWrapper>
      <PageDiv>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Prev'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
            Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </span>{' '}
      </PageDiv>
    </>
  )
}

const TableWrapper = styled.div`
  flex-direction:column ;
  justify-content:center ;
  align-items:center;
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
  font-style: normal;
  display:flex ;
  

  table {
    height:80vh;
    background: #ffffff;
    width: 90%;
    border: 1px solid rgba(164, 167, 183, 0.4);
    border-radius: 4px;
  }

  th {
    
    text-align: center;
    white-space: nowrap;
  }

  tr {
    border-bottom: 1px solid #E5E5E5;
    height: 50px;
    text-align: center;

    &:hover {
      .options {
        opacity: 1;
      }
    }
  }

  td {
    text-align: center;
    padding: 0 1rem;
    white-space: nowrap;
    text-transform: capitalize;
  }

  thead {
    border-bottom: 1px solid #e4e4e4;
    text-transform: uppercase;
  }

  tbody {
    tr {
      &:hover {
        background: rgba(53, 88, 199, 0.1);
      }
    }
  }
`;

const InputDiv = styled.div`
  display: flex;
  justify-content:center ;
  padding: 20px;
  input{
    width: 350px;
    height: 30px;
    padding:4px ;
    &:focus {
        outline: none;
    }
  }
`
const PageDiv = styled.div`
  display: flex;
  justify-content:center ;
  padding: 20px;
  

  button{
    margin-right: 10px;
    background-color: #a0e5ab;
    padding: 5px 16px;
    color: white;
    border:none ;

    &:hover{
      color: black
    }
  }

  span{
    margin-right: 10px;
    @media screen and (max-width: 992px){
      display: none;
    }
  }

  input{
    height: 20px;
    width: 50px;
  }
`

export { CustomTable,TableWrapper }