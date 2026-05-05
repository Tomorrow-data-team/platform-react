import React from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import lookerUrl from "./LookerLinks";

import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  CircularProgress,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Card
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import Page404 from "@/pages/auth/Page404";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;


function Dash() {
  const { clientSlug, clientId } = useParams()
  console.log(clientId)

  const [display, setDisplay] = useState('none')

  return (
    <React.Fragment>
      <Helmet title="Dash" />
      {/*<Grid justifyContent="space-between" container spacing={10}>
        <Grid>
          <Typography variant="h3" gutterBottom display="inline">
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />*/}
        <div style={{height:'100%', width:'100%', justifyContent:"center"}}>
          {lookerUrl[clientSlug]?
          <iframe
            onLoad={()=>{setDisplay(false)}}
            width='100%'
            height="100%"
            src={lookerUrl[clientSlug]}
            allowFullScreen
            border= "none"
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
          </iframe>:<Page404 />}
        </div>

    </React.Fragment>
  );
}

export default Dash;
