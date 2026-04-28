import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;

function DefaultTextFields() {

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          UCID
        </Typography>
        <Typography variant="body2" gutterBottom>
          The <code>TextField</code> wrapper component is a complete form
          control including a label, input and help text.
        </Typography>
        <Paper mt={3}>
          <form noValidate autoComplete="off">
            <TextField
              m={2}
              required
              id="standard-required"
              label="Required"
              defaultValue="Hello World"
            />
            <TextField
              m={2}
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              m={2}
            />
            <TextField
              id="standard-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              m={2}
            />
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              m={2}
            />
            <TextField
              m={2}
              id="standard-search"
              label="Search field"
              type="search"
            />
            <TextField
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              m={2}
            />
          </form>
        </Paper>
      </CardContent>
    </Card>
  );
}

function OutlinedTextFields() {
        let location = useLocation();
  console.log(location.state.userId)

  const [loading, setLoading] = useState(true)

  const [ucid, setUCID] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/ucid/one?id=1")
      .then(response => {
        setUCID(response.data)
        setLoading(false)
        console.log(response.data[0])
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Outlined Text Fields
        </Typography>
        <Typography variant="body2" gutterBottom>
          <code>TextField</code> supports outlined styling.
        </Typography>
        {loading?<></>:
        <Paper mt={3}>
          <form noValidate autoComplete="off">
            {ucid[0]? Object.keys(ucid[0]).map(key =>{
                {console.log(ucid[0][key])}
            <TextField
              required
              id="standard-required"
              label="Required"
              defaultValue={ucid[0][key]}
              variant="outlined"
              m={2}
            />}):<></>}
            <TextField
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="outlined"
              m={2}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              m={2}
            />
            <TextField
              id="standard-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              m={2}
            />
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              m={2}
            />
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="outlined"
              m={2}
            />
            <TextField
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="outlined"
              m={2}
            />
          </form>
        </Paper>}
      </CardContent>
    </Card>
  );
}

function UcidSingle() {
  return (
    <React.Fragment>
      <Helmet title="Text Fields" />
      <Typography variant="h3" gutterBottom display="inline">
        Text Fields
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link component={NavLink} to="/">
          Forms
        </Link>
        <Typography>Text Fields</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <DefaultTextFields />
          <OutlinedTextFields />
          {/*<OutlinedTextFields />*/}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default UcidSingle;
