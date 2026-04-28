import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
import { CloudUpload as MuiCloudUpload, Add as AddIcon} from "@mui/icons-material";
import { spacing } from "@mui/system";
import ClientList from "./ClientList";

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

function AllClientSettings() {

  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        Utilities
      </Typography>
                  <Grid justifyContent="space-between" container spacing={10}>
              <Grid>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Utilities
        </Link>
        <Typography>Client Settings</Typography>
      </Breadcrumbs>
      </Grid>
              <Grid>
                <div>
                  <Button component={NavLink} to={"create"} variant="contained" color="primary">
                    
                    New Client
                    <AddIcon />
                  </Button>
                </div>
              </Grid>
            </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid
          size={{
            xs: 12,
            lg: 12,
          }}
        >
          <ClientList active={true}/>
        </Grid>

          
      </Grid>
    </React.Fragment>
  );
}

export default AllClientSettings;
