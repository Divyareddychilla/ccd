import React, { useEffect } from 'react';
import DataGridDemo from './Table';
const columns = [
  { field: '_id', headerName: '_id', width: 90 },
  { field: 'author', headerName: 'author', width: 90 },
  {
    field: 'authorSlug',
    headerName: 'authorSlug',
    width: 150,
    editable: true,
  },
  {
    field: 'content',
    headerName: 'content',
    width: 150,
    editable: true,
  },
  {
    field: 'dateAdded',
    headerName: 'AgdateAddede',
    width: 110,
    editable: true,
  },
  {
    field: 'dateModified',
    headerName: 'dateModified',
    width: 110,
    editable: true,
  },
  {
    field: 'tags',
    headerName: 'tags',
    width: 110,
    editable: true,
  },
];
function Table() {

  return (
    <>
      <DataGridDemo getQuery={'https://api.quotable.io/quotes?'} exportQuery={"https://api.quotable.io/quotes?"} columns={columns} />
    </>
  );
}

export default Table;
