import React from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Looker from './Looker'
import Bigquery from './Bigquery'
import BQdetails from "./BQ";
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
import { CloudUpload as MuiCloudUpload } from "@mui/icons-material";
import { spacing } from "@mui/system";
import ClientProfile from "./ClientProfile";

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

function Private() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          BigQuery Details
        </Typography>
        <TextField
            id="table_id"
            label="Table Id"
            variant="outlined"
            fullWidth
            my={2}
        />
        <Grid container spacing={6}>
          <Grid
            size={{
              md: 6,
            }}
          >
            <TextField
              id="Spend"
              label="Spend"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid
            size={{
              md: 6,
            }}
          >
            <TextField
              id="Impressions"
              label="Impressions"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          defaultValue="lucylavender@gmail.com"
          fullWidth
          my={2}
        />

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          fullWidth
          my={2}
        />

        <TextField
          id="address2"
          label="Apartment, studio, or floor"
          variant="outlined"
          fullWidth
          my={2}
        />

        <Grid container spacing={6}>
          <Grid
            size={{
              md: 6,
            }}
          >
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid
            size={{
              md: 4,
            }}
          >
            <TextField
              id="state"
              label="State"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid
            size={{
              md: 2,
            }}
          >
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function ClientSettings() {
  const client = useParams()
  return (
    <React.Fragment>
      <Helmet title="Settings" />
      <Typography variant="h3" gutterBottom display="inline">
        Settings
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="../overview">
          {client.slug}
        </Link>
        <Typography>Settings</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
        <ClientProfile />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ClientSettings;
