import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  useGridApiRef,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,

} from '@mui/x-data-grid';
import * as XLSX from 'xlsx';


type DataGridProps = {
    getQuery: string;
    exportQuery?: string;
    columns: {
        field: string;
        headerName: string;
        width: number;
        editable?: boolean;
    }[];
};
// export full Data

// json local export 
/* const getJson = (apiRef) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });
  return JSON.stringify(data, null, 2);
}; */
const getJson = async (apiRef) => {
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
    console.log(visibleColumnsField,'@visibleColumnsField');
    await fetch('https://api.quotable.io/quotes?')
    .then(response => response.json())
    const data = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        let element = apiRef.current.getCellParams(id, field).value;
        if (element instanceof Array) {
          element = element.join(', ');
        }
        row[field] = element;
      });
      return row;
    });
    return JSON.stringify(data, null, 2);
  };


const exportBlob = (blob, filename) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};
// json menu component
function JsonExportMenuItem(props) {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: 'text/json',
        });
        exportBlob(blob, 'DataGrid_demo.json');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
}
// execl local export
const exportToExcel = (apiRef) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      let element = apiRef.current.getCellParams(id, field).value;
      if (element instanceof Array) {
        element = element.join(', ');
      }
      row[field] = element;
    });
    return row;
  });
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'data_export.xlsx');
};
// execl menu component
function ExcelExportMenuItem(props) {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => exportToExcel(apiRef)}
    >
      Export Excel
    </MenuItem>
  );
}
// csv local export
const getCSV = (apiRef) => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Create CSV header
  const header = visibleColumnsField.join(',');

  // Format the data rows
  const rows = filteredSortedRowIds.map((id) => {
    return visibleColumnsField.map((field) => {
      const cellValue = apiRef.current.getCellParams(id, field).value;
      // Handle potential commas in cellValue
      return `"${cellValue}"`;
    }).join(',');
  });

  // Combine header and rows
  const csvContent = [header, ...rows].join('\n');
  return csvContent;
};
// csv  menu component
function CsvExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const csvString = getCSV(apiRef);
        const blob = new Blob([csvString], {
          type: 'text/csv',
        });
        exportBlob(blob, 'DataGrid_demo.csv');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export CSV
    </MenuItem>
  );
}
// export button component
function CustomExportButton(props) {
  return (
    <GridToolbarExportContainer {...props}>
      <CsvExportMenuItem  fetchAllData={props.fetchAllData}/>
      <JsonExportMenuItem fetchAllData={props.fetchAllData}/>
      <ExcelExportMenuItem fetchAllData={props.fetchAllData}/>
    </GridToolbarExportContainer>
  );
}
export default function DataGridDemo({getQuery,exportQuery,columns}: DataGridProps) {
    const apiRef = useGridApiRef();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);

    const [pageSize, setPageSize] = useState(20);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(true);
    const fetchAllQuotes = async () => {
        let url = new URL(getQuery);
        url.searchParams.append('limit', totalRows.toString());
        let quotes = await fetch(url.toString());
        let data = await quotes.json();
        return data;
      }
    const fetchQuotes = async (page=0,sort?:{field:string,sort:"desc"|"asc"}) => {
        console.log(page,'@page')
        console.log(getQuery,'@getQuery')
        let url = new URL(getQuery);
        url.searchParams.append('page', page.toString());
        if(sort){
            url.searchParams.append('sortBy', sort.field);
            url.searchParams.append('sortOrder', sort.sort);
        }
        console.log(url.toString(),'@url');
        let quotes = await fetch(url.toString());
        let data = await quotes.json();
        console.log(data,'@data')
        data.results.map((quote:any)=>{
            quote.id = quote._id;
            return quote;
        });
        setRows(data.results);
        setPage(data.page);
        setPageSize(data.count);
        setTotalRows(data.totalCount);
        setLoading(false);
      };
    
    useEffect(()=>{
          fetchQuotes();
    },[])
    function CustomToolbar(props) {
      return (
        <GridToolbarContainer {...props}>
          <CustomExportButton fetchAllData={fetchAllQuotes}/>
        </GridToolbarContainer>
      );
    }
  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
       apiRef={apiRef}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
                page: page,
            },
          },
        }}
        slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
        slots={{ toolbar: CustomToolbar }}
        density="standard"
        disableColumnMenu={true}
        pageSizeOptions={[pageSize]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        loading={loading}
        onPaginationModelChange={(e) => {
            setLoading(true);
            fetchQuotes(e.page);
            console.log('onPaginationModelChange', e);
        }}
        paginationMode="server"
        rowCount={totalRows}
        filterMode="server"
        onSortModelChange={(e) => {
          console.log('onFilterModelChange', e);
          console.log(e.length,'@e.length');
          if(e.length){
            fetchQuotes(0,e[0] as {field:string,sort:"desc"|"asc"});
            
          }else{
            fetchQuotes();
          }
          apiRef.current.setPage(0);
        }}
        processRowUpdate={(updatedRow, originalRow) => {
          console.log('processRowUpdate', updatedRow, originalRow);
          return updatedRow;
        }}
        onProcessRowUpdateError={(error: any) => {
          console.log('onProcessRowUpdateError', error);
        }}
        
      />
    </Box>
  );
}
