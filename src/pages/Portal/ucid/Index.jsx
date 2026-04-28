import React from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { getUCID } from 'api/data';
import Loading from '@/layouts/Loading';
import Error2 from '@/layouts/Error2';
import { useState, useEffect } from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Box,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import {
  Edit,
  RemoveRedEye,
  Add as AddIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function UCIDDataGrid() {

  const columns = [
  { field: "Channel", headerName: "Channel", width: 150, editable: false },
  { field: "Platform", headerName: "Platform", width: 150, editable: false },
  { field: "Campaign_Name", headerName: "Campaign Name", width: 250, editable: false},
  { field: "UCID", headerName: "UCID", width: 150, editable: false },
  { field: "Country_Code", headerName: "Country", width: 150, editable: false },
  { field: "Created_Date", headerName: "Last Edited", width: 150, editable: false },
  { field: "Strategy", headerName: "Strategy", width: 150, editable: false },
  { field: "Campaign_Currency", headerName: "Currency", width: 150, editable: false },
  { field: "Requested_by", headerName: "Requested By", width: 150, editable: false },
  { field: "Client_Identifier", headerName: "Client Identifier", width: 150, editable: false },
  { field: "Client_Identifier1", headerName: "Client Identifier 1", width: 150, editable: false },
  { field: "Client_Identifier2", headerName: "Client Identifier 2", width: 150, editable: false },
  { field: "Client_Identifier3", headerName: "Client Identifier 3", width: 150, editable: false },
  { field: "Edit", headerName: "Edit", width: 100, editable: false,
    renderCell: (value) => {return <IconButton aria-label="details" component={NavLink} to={`edit/${value.row.ucid_id}`} size="large"
                              //state = {{ id }}                 
                            >
                               <Edit />
                               </IconButton>} },
];

  const client=useParams()

  const [data,setData] = useState()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  
  const fetchData = async () => {
      setStatus('loading')
      try{
      const resp = await getUCID(client.clientId);
      setData(resp)
      console.log(resp)
      setStatus("success")
      } catch(err){
      setError(err.message);
      setStatus('error')
      }
  }
  useEffect(() => {
      fetchData();
  }, []);
    
  if(status=='loading') return <Loading />
  if(status=='error') return <Error2/>
  if(status=='success')

  return (
    <Box sx={{ height: 620, width: '100%', mb:5 }}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
          ...data.initialState,
          columns: {
            ...data.initialState?.columns,
            columnVisibilityModel: {
              Strategy:false,
              Requested_by:false,
              Client_Identifier: false,
              Client_Identifier1: false,
              Client_Identifier2: false,
              Client_Identifier3: false,
            },},
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
    </Box>
  )
}

function UcidList() {
  const client = useParams()
  return (
    <React.Fragment>
      <Helmet title="Invoices" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid>
          <Typography variant="h3" gutterBottom display="inline">
            UCID
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to={`/${client.clientId}/overview`}>
                <Typography >{client.slug}</Typography>
              </Link>
            <Typography >UCID</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid>
          <div>
            <Button component={NavLink} to={"create"} variant="contained" color="primary">
              <AddIcon />
              New UCID
            </Button>
          </div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <UCIDDataGrid />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default UcidList;