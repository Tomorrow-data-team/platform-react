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
import { getSingleUCID } from "api/data";
import Error2 from "@/layouts/Error2";
import Loading from "@/layouts/Loading";

import {
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

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

function BasicForm() {
  const ucid = useParams()

  const [disabled, setDisabled] = useState(true)

  const [success, setSuccess] = useState(false)

  const [initialValues, setInitialValues] = useState();

  const [data,setData] = useState()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState()
  
  const items=[{'id':'Advertiser_Name', name: "Advertiser Name", disabled:true},
    {id:'Channel', name: "Channel", disabled:false},
    {id:'Platform', name: "Platform", disabled:false},
    {id:'UCID', name: "UCID", disabled:true},
    {id:'Campaign_Currency', name: "Currency", disabled:false},
    {id:'Strategy', name: "Strategy", disabled:false},
    {id:'Client_Identifier', name: "Client Identifier", disabled:false},
    {id:'Client_Identifier1', name: "Client Identifier 1", disabled:false},
    {id:'Client_Identifier2', name: "Client Identifier 2", disabled:false},
    {id:'Client_Identifier3', name: "Client Identifier 3", disabled:false},
    {id:'Requested_by', name: "Requested By", disabled:true},
    {id:'Created_Date', name: "Last Edit", disabled:true},
  ]

  const fetchData = async () => {
      setStatus('loading')
      try{
      const resp = await getSingleUCID(ucid.ucidId);
      setData(resp[0])
      setInitialValues(resp[0])
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
      
  const handleEdit = (e) =>{
    e.preventDefault()
    setDisabled(false)
  }

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    //try {
      setSuccess(false)
      setDisabled(true)
      if(JSON.stringify(values)===JSON.stringify(initialValues)){return}
      await timeOut(1500);
      console.log(values)
      setInitialValues()
      axios.post(`https://platform-flask-production-28c4.up.railway.app/ucid/update`, JSON.stringify(values), {headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      resetForm();
      setSuccess(true)
      setSubmitting(false);
      
      // handle success
      setInitialValues(response.data[0])
      console.log(response);

    })
    .catch(function (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
    )
  };
  if(status=='loading') return <Loading />
  if(status=='error') return <Error2/>
  if(status=='success')

  return (
    <div>
    {initialValues ? (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit} 
    >
      {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status,}) => (
        <Card mb={6}>
          <CardContent>
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
              <form>
                <Grid>
                  {items.map(item=>{
                    return(
                  <TextField
                    name={item.id}
                    key={item.id}
                    label={item.name}
                    value={values[item.id]}
                    disabled={disabled?true:item.disabled}
                    fullWidth
                    onChange={handleChange}
                    variant="outlined"
                    my={2}/>)
                  })} </Grid>
                  <Button
                    //type="submit"
                    onClick={disabled?handleEdit:handleSubmit}
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    {disabled?'Edit':'Save Changes'}
                  </Button>
              </form> 

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

function UcidDetails() {
  const client = useParams()
  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <Typography variant="h3" gutterBottom display="inline">
        UCID
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to={`../overview`}>
          <Typography >{client.slug}</Typography>
        </Link>
        <Link component={NavLink} to={`../ucid`}>
          <Typography >UCID</Typography>
        </Link>
        <Typography >Edit</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default UcidDetails;
