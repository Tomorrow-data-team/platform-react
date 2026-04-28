import React from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Error from "@/layouts/Error";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getBQDetails } from "api/clients";
import BQDetails from "./Bigquery";
import BQEmpty from "./BQEmpty";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { preventDefault } from "@fullcalendar/core/internal";
import BigquerySettings from "./Bigquery";

import Loading from "@/layouts/Loading";
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);


function BQConditionalRender({status, data, error}){
  console.log(status, data, error)
  if (status === 'loading')return <Loading />;
  if (status === 'error') return <Error error={error}/>
  if (status === "success" && data.length === 0) return <BQEmpty />

  return <BQDetails data={data}/>
}

function BigQuery() {

  const [error, setError] = useState()
  const [status, setStatus] = useState('loading')

  const [data, setData] = useState();

  const fetchData = async () => {
    setStatus('loading')
    try{
      const resp = await getBQDetails(client.clientId);
      console.log(resp)
      setData(resp)
      setStatus("success")
    } catch(err){
      setError(err);
      setStatus('error')
    }
  }

  useEffect(()=>{
    fetchData();
  }, []);

  const client = useParams()

  return (
    <React.Fragment>
      <Helmet title="Settings" />
      <Typography variant="h3" gutterBottom display="inline">
        BigQuery Details
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="../overview">
          {client.slug}
        </Link>
        <Link component={NavLink} to="../settings">
          Settings
        </Link>
        <Typography>BigQuery</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <BQConditionalRender status={status} data={data} error={error} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BigQuery
