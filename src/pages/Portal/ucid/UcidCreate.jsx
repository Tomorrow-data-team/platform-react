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
import SearchOne from "./SearchOne";
import Stack from '@mui/material/Stack';
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
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);


const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const ucidSchema = {"Campaign":"Campaign_Name",
            "Channel":"Channel",
            "Currency":"currency",
            "Country Code":"Country_Code",
            "Platform":"platform",
            "Strategy":"strategy",
            "Client Identifier":"Client_Identifier",
            "Client Identifier 1":"Client_Identifier1",
            "Client Identifier 2":"Client_Identifier2",
            "Client Identifier 3":"Client_Identifier3",
}


function BasicForm() {
  const client = useParams()
  const [loading, setLoading] = useState(true)

    const [options, setOptions] = useState()
    useEffect(() => {
    axios.get(`https://platform-flask-production-28c4.up.railway.app/ucid/options/${client.clientId}`)
      .then(response => {
        setOptions(response.data);
        setLoading(false)
        //console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
      await timeOut(1500);
      console.log(values)
      axios.post(`https://platform-flask-production-28c4.up.railway.app/ucid/create`, JSON.stringify(values), {headers: {'Content-Type': 'application/json'}})
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

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
    >
      {({
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            {status && status.sent && (
              <Alert severity="success" my={3}>
                Your data has been submitted successfully!
              </Alert>
            )}

            {isSubmitting || loading ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                {options? Object.keys(options).map(key=>{
                    return(
                        <Grid>
                            <SearchOne values={values} handleChange={handleChange} label={key} data={options[key].flat()} setFieldValue={setFieldValue} />
                        </Grid>
                    )
                  }):<></>}   
                  </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                >
                  Submit
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function UcidCreate() {
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
        <Typography >Create</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default UcidCreate;
