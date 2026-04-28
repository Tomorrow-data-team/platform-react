import React from "react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";
import {
  Divider,
  Breadcrumbs,
  Link,
    Box,
    CircularProgress,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  FormControl as MuiFormControl,
  Grid,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);


function LookerDetails() {

    const [looker, setLooker] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    axios.get(`http://127.0.0.1:5000/clients/looker/1`, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
        setLooker(response.data[0])
        console.log(response.data[0])
        setLoading(false)
            })
        .catch(error => {
        console.error(error);
        });
    }, []);
  return (
    <Card mb={6}>
      <CardContent>

        {loading?
        <Box display="flex" justifyContent="center" my={6}>
        <CircularProgress />
        </Box>
            :<>
        <Grid container spacing={6} sx={{paddingBottom:'10px'}}>
          <Grid
            size={{
              md: 12,
            }}
          >
            <TextField
              id="name"
              label="Name"
              defaultValue={Looker.title}
              variant="outlined"
              fullWidth
              my={2}
            />

              <TextField
                label="LookerUrl"
                id="LookerUrl"
                multiline={true}
                rows={3}
                defaultValue={looker.url}
                fullWidth
                //maxRows={4}
                variant="outlined"
                //defaultValue="Lucy is a Freelance Writer and Social Media Manager who helps finance professionals and Fin-tech startups build an audience and get more paying clients online."
              />
          </Grid>
          {/*<Grid
            size={{
              md: 4,
            }}
          >
            <CenteredContent>
              <BigAvatar
                alt="Remy Sharp"
                src="/static/img/avatars/avatar-1.jpg"
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={2} /> Upload
                </Button>

                <Typography variant="caption" display="block" gutterBottom>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </Typography>
              </label>
            </CenteredContent>
          </Grid>*/}
        </Grid>

        <Button variant="contained" color="primary">
          Save changes
        </Button></>}
      </CardContent>
    </Card>
  );
}

function Looker() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />
      <Typography variant="h3" gutterBottom display="inline">
        Looker Details
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="../overview">
          Peacocks
        </Link>
        <Link component={NavLink} to="../settings">
          Settings
        </Link>
        <Typography>Looker</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <LookerDetails />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Looker
