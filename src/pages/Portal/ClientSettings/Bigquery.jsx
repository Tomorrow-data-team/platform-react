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

const mainColumnOrder = ['table_id', 'Platform', 'Campaign', 'Spend', 'Clicks', 'Impressions']
const additionalColumns = ['metric1_name', 'metric1', 'metric2_name', 'metric2', 'metric3_name', 'metric3']
const timeOut = (time) => new Promise((res) => setTimeout(res, time));

export default function BQDetails({data}) {
  console.log(data)
  const [success, setSuccess] = useState()
  const [disabled, setDisabled] = useState(true)
  const [initialValues, setInitialValues] = useState(data[0])

  const handleEdit = (e) =>{
    e.preventDefault()
    setDisabled(false)
  }
  const disabledEntries =["client_id"]

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    //try {
      //var dict = getDifference(values)
      setSuccess(false)
      setDisabled(true)
      if(JSON.stringify(values)===JSON.stringify(initialValues)){return}
      await timeOut(1500);
      setInitialValues()
      //console.log(JSON.stringify(values))
      axios.put('https://platform-flask-production-28c4.up.railway.app/edit', JSON.stringify(values), {headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      resetForm();
      //setStatus({ sent: true });
      setSuccess(true)
      //getUcid
      setSubmitting(false);
      
      // handle success
      setInitialValues(response.data[0])
      console.log(response);
      //console.log(status)
     //getUcid
    })
    .catch(function (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
    )
  };
  return (
    <div>
    {initialValues ? (
    <Formik
      initialValues={initialValues}
      //validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        //ucid,
        status,
      }) => (
        
        <Card mb={6}>
          <CardContent>
            {/*<<Typography variant="h6" gutterBottom>
              UCID
            </Typography>
            {/*<Typography variant="body2" gutterBottom>
              Formik example with Yup validation
            </Typography>*/}

            {success && (
              <Alert severity="success" my={3}>
                Your changes have been submitted successfully!
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) :
            <div>
              {disabled ? (
                
              <form>
                <Grid>
                  {mainColumnOrder.map(key=>{
                    return(
                  <TextField
                    name={key}
                    key={key}
                    label={key.replace("_", " ")}
                    value={values[key]}
                    disabled={true}
                    //error={Boolean(touched.email && errors.email)}
                    fullWidth
                    //helperText={touched.email && errors.email}
                    //onBlur={handleBlur}
                    onChange={handleChange}
                    //type="email"
                    variant="outlined"
                    my={2}/>)
                  })}
                  <Accordion sx={{ '&:before':{height:'0px'}}} elevation={0}>
                            <AccordionSummary sx={{ height: '10px' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        >
                        <Typography sx={{ height: '10px' }}component="span">Additional Metrics</Typography>
                        </AccordionSummary>
                    <AccordionDetails>
                    {additionalColumns.map(key=>{
                    return(
                  <TextField
                    name={key}
                    key={key}
                    label={key.replace("_", " ")}
                    value={values[key]}
                    disabled={true}
                    //error={Boolean(touched.email && errors.email)}
                    fullWidth
                    //helperText={touched.email && errors.email}
                    //onBlur={handleBlur}
                    onChange={handleChange}
                    //type="email"
                    variant="outlined"
                    my={2}/>)
                  })}
                  </AccordionDetails>
                  </Accordion>
                  </Grid>
                  <Button
                    //type="submit"
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    Edit
                  </Button>
              </form> ):(
              <form onSubmit={handleSubmit}>
                <Grid>
                  {mainColumnOrder.map(key=>{
                    return(
                  <TextField
                    name={key}
                    label={key.replace("_", " ")}
                    value={values[key]}
                    disabled={disabledEntries.indexOf(key) != -1 ? true: false}
                    //error={Boolean(touched.email && errors.email)}
                    fullWidth
                    //helperText={touched.email && errors.email}
                    //onBlur={handleBlur}
                    onChange={handleChange}
                    //type="email"
                    required="true"
                    variant="outlined"
                    my={2}/>)
                  })}
                <Accordion sx={{ '&:before':{height:'0px'}}} elevation={0}>
                    <AccordionSummary sx={{ height: '10px' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    >
                    <Typography sx={{ height: '10px' }}component="span">Additional Metrics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    {additionalColumns.map(key=>{
                    return(
                  <TextField
                    name={key}
                    label={key.replace("_", " ")}
                    value={values[key]}
                    disabled={disabledEntries.indexOf(key) != -1 ? true: false}
                    //error={Boolean(touched.email && errors.email)}
                    fullWidth
                    //helperText={touched.email && errors.email}
                    //onBlur={handleBlur}
                    onChange={handleChange}
                    //type="email"
                    variant="outlined"
                    my={2}/>)
                  })}
                  </AccordionDetails>
                  </Accordion>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    Save changes
                  </Button>
              </form> )}
              </div>
            }
          </CardContent>
        </Card>
      )}
    </Formik>):<Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>}</div>
  );
}