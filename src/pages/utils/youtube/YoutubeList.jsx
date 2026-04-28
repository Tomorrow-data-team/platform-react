import React from "react";
import styled from "@emotion/styled";
import { NavLink, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import YoutubeSearch from "./YoutubeSearch";
import Error2 from "@/layouts/Error2";
import Loading from "@/layouts/Loading";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import DataList from "@/layouts/DataList";
import { CloudUpload as MuiCloudUpload } from "@mui/icons-material";
import { youtubeSearch } from "api/utilities";
import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)};
`;

function formatDuration(str) {
  const h = (str.match(/(\d+)H/) || [0, 0])[1];
  const m = (str.match(/(\d+)M/) || [0, 0])[1];
  const s = (str.match(/(\d+)S/) || [0, 0])[1];

  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function ListResults(){

    const columns = [
  { field: "channelTitle", headerName: "Channel", width: 150, editable: true},
  { field: "title", headerName: "Video Title", width: 300, editable: true },
  { field: "id", headerName: "Link", width: 300, editable: true, renderCell: (value) => {if (!value) {return value;} console.log(value)
  return <a href={value.id} target="_blank">{value.id}</a>}
   },
  { field: "views", headerName: "Views", width: 125, editable: true, valueGetter: (value) => {if (!value) {return value;} return parseFloat(value).toLocaleString()}},
  { field: "likes", headerName: "Likes", width: 125, editable: true, valueGetter: (value) => {if (!value) {return value;} return parseFloat(value).toLocaleString()}},
    { field: "datetime", headerName: "Upload Date", width: 125, editable: true },
  { field: "duration", headerName: "Duration", width: 125, editable: true, valueGetter: (value) => {if (!value) {return value;} return formatDuration(value)}},
];
    const [data,setData] = useState()
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    let [url, setUrl] = useSearchParams()
    const search_term = url.get('search_term')
    const start_date = url.get('start_date')
    const end_date = url.get('end_date')
    
    const fetchData = async () => {
        setStatus('loading')
        try{
        const resp = await youtubeSearch(search_term, start_date, end_date);
        setData(resp.data)
        console.log(resp.data)
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
        showToolbar
        //pageSizeOptions={[5]}
        //checkboxSelection
        disableRowSelectionOnClick
      />
    )

}

function YoutubeList() {

  return (
    <React.Fragment>
      <Helmet title="Settings" />
      <Typography variant="h3" gutterBottom display="inline">
        Youtube Search
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Utilities
        </Link>
        <Link component={NavLink} to="../youtube">
          Search
        </Link>
        <Typography>Results</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <ListResults data={'list'}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default YoutubeList;
