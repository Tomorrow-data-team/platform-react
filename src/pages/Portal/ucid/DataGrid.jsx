import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Card } from '@mui/material';
import { getUCID } from 'api/data';
import Loading from '@/layouts/Loading';
import Error2 from '@/layouts/Error2';
import { useParams, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { RemoveRedEye } from '@mui/icons-material';
import { IconButton } from '@mui/material';



export default function BasicExampleDataGrid() {

  const columns = [
  { field: "Campaign_Name", headerName: "Campaign Name", width: 150, editable: true, visible:false},
  { field: "Channel", headerName: "Channel", width: 150, editable: true },
  { field: "Platform", headerName: "Platform", width: 150, editable: true },
  { field: "UCID", headerName: "UCID", width: 150, editable: true },
  { field: "Country_Code", headerName: "Country", width: 150, editable: true },
  { field: "Created_Date", headerName: "Created Date", width: 150, editable: true },
  { field: "Strategy", headerName: "Strategy", width: 150, editable: true },
  { field: "Requested_by", headerName: "Requested By", width: 150, editable: true },
  { field: "Client_Identifier", headerName: "Client Identifier", width: 150, editable: true, visible:false },
  { field: "Client_Identifier1", headerName: "Client Identifier 1", width: 150, editable: true },
  { field: "Client_Identifier2", headerName: "Client Identifier 2", width: 150, editable: true },
  { field: "Client_Identifier3", headerName: "Client Identifier 3", width: 150, editable: true },
  { field: "actions", headerName: "Actions", width: 150, editable: true,
    renderCell: (value) => {return <IconButton aria-label="details" component={NavLink} to={"detail"} size="large"
                              //state = {{ id }}                 
                            >
                               <RemoveRedEye />
                               </IconButton>} },
];

  const { clientSlug, clientId } =useParams()  
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['ucid', clientId],
    queryFn: () => getUCID(clientId),
    enabled: !!clientId, // important safety check
  });
    
  if(isLoading) return <Loading />
  if(isError) return <Error2/>

  return (
    <Card>
    <div style={{ height: '650px', width: '100%' }}>
          return(
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              //showToolbar
              //pageSizeOptions={[5]}
              //checkboxSelection
              disableRowSelectionOnClick
            />
          )
    </div>
    </Card>
  );
}