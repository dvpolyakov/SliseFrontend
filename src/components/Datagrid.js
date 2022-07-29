import React from 'react';
import { DataGrid as MuiDataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { CustomDatagridToolbar } from './grid-toolbar';
import { styled } from '@mui/system';

const SMuiDataGrid = styled(MuiDataGrid)(() => ({
  border: 'none',
  [`.${gridClasses.columnHeaderTitleContainer}`]: {
    padding: 0,
  },
  [`.${gridClasses.toolbarContainer}`]: {
    backgroundColor: '#FBFBFB',
  },
}));

const Datagrid = ({ columns, rows }) => {
  return (
    <SMuiDataGrid
      autoHeight
      columns={columns}
      rows={rows}
      components={{
        Toolbar: CustomDatagridToolbar,
        ColumnResizeIcon: () => null,
      }}
      checkboxSelection
      disableSelectionOnClick
    />
  );
};

export default Datagrid;
