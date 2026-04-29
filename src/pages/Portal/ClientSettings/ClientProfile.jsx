import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Bar } from "react-chartjs-2";
import EditIcon from '@mui/icons-material/Edit';
import {
  Briefcase,
  DollarSign,
  ExternalLink,
  Home,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { ReactComponent as Facebook } from "@/vendor/facebook.svg";
import { ReactComponent as Instagram } from "@/vendor/instagram.svg";

import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  LinearProgress as MuiLinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const ImageWrapper = styled.div`
  width: 150px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 95%;
  max-h`

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(2)};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ChartWrapper = styled.div`
  height: 280px;
  position: relative;
`;

const StatsIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const ProductsChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

function Details() {
    const client=useParams()
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" alignContent={"center"} gutterBottom>
          {client.slug}
        </Typography>

        <Divider mb={4} />

        <Centered>
            <ImageWrapper>
                <Image src ="https://www.peacocks.co.uk/on/demandware.static/-/Library-Sites-PCKSharedLibrary/default/dwe35f79be/images/logos/Peacocks.svg"/>
            </ImageWrapper>
          <Typography variant="body2" component="div" gutterBottom>
          </Typography>

        </Centered>
      </CardContent>
    </Card>
  );
}

function Skills() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <Chip size="small" mr={1} mb={1} label="HTML" color="secondary" />
          <Chip size="small" mr={1} mb={1} label="JavaScript" />
          <Chip size="small" mr={1} mb={1} label="Sass" />
          <Chip size="small" mr={1} mb={1} label="React" />
          <Chip size="small" mr={1} mb={1} label="Redux" />
          <Chip size="small" mr={1} mb={1} label="Next.js" />
          <Chip size="small" mr={1} mb={1} label="Material UI" />
          <Chip size="small" mr={1} mb={1} label="UI" />
          <Chip size="small" mr={1} mb={1} label="UX" />
        </Centered>
      </CardContent>
    </Card>
  );
}

function About() {
  return (
    <Card mb={6} >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detials
        </Typography>

        <Divider mb={4} />

      <nav aria-label="main mailbox folders">
        <List disablePadding>
          <ListItem disablePadding component={NavLink} to={'bigquery'}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="BigQuery" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={NavLink} to={'looker'}>
            <ListItemButton>
              <ListItemIcon>
                <Briefcase />
              </ListItemIcon>
              <ListItemText primary="Looker Dashboards" />
            </ListItemButton>
          </ListItem>
            <ListItem disablePadding component={NavLink} to={'assets'}>
            <ListItemButton>
              <ListItemIcon>
                <MapPin />
              </ListItemIcon>
              <ListItemText primary="Icons & Assets" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      </CardContent>
    </Card>
  );
}

function Elsewhere() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Socials
        </Typography>

        <Divider mb={4} />

        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid>
            <AboutIcon>
              <ExternalLink />
            </AboutIcon>
          </Grid>
          {/*<Grid>
            <Link href="https://mira.bootlab.io/">lucylavender.io</Link>
          </Grid>*/}
        </Grid>
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid>
            <AboutIcon>
              <Facebook />
            </AboutIcon>
          </Grid>
          <Grid>
            <Link href="https://mira.bootlab.io/">Facebook</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid>
            <AboutIcon>
              <Instagram />
            </AboutIcon>
          </Grid>
          <Grid>
            <Link href="https://mira.bootlab.io/">Instagram</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Earnings() {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">$ 2.405</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            Total Earnings
          </Typography>

          <StatsIcon>
            <DollarSign />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={75}
            color="secondary"
            mt={4}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function Orders() {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">30</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            Orders Today
          </Typography>

          <StatsIcon>
            <ShoppingBag />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={30}
            color="secondary"
            mt={4}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function Revenue() {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">$ 1.224</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            Total Revenue
          </Typography>

          <StatsIcon>
            <DollarSign />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={50}
            color="secondary"
            mt={4}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function Products() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Tech</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  AppStack
                </TableCell>
                <TableCell>
                  <ProductsChip size="small" label="HTML" color="primary" />
                </TableCell>
                <TableCell>Single License</TableCell>
                <TableCell>76</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Mira
                </TableCell>
                <TableCell>
                  <ProductsChip size="small" label="React" color="success" />
                </TableCell>
                <TableCell>Single License</TableCell>
                <TableCell>38</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Milo
                </TableCell>
                <TableCell>
                  <ProductsChip size="small" label="HTML" color="primary" />
                </TableCell>
                <TableCell>Single License</TableCell>
                <TableCell>43</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Robust UI Kit
                </TableCell>
                <TableCell>
                  <ProductsChip size="small" label="Angular" color="error" />
                </TableCell>
                <TableCell>Single License</TableCell>
                <TableCell>27</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Spark
                </TableCell>
                <TableCell>
                  <ProductsChip size="small" label="React" color="success" />
                </TableCell>
                <TableCell>Single License</TableCell>
                <TableCell>12</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
}

const SalesRevenue = withTheme(({ theme }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        hoverBackgroundColor: theme.palette.secondary.main,
        hoverBorderColor: theme.palette.secondary.main,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
      },
      {
        label: "Revenue",
        backgroundColor: theme.palette.grey[200],
        borderColor: theme.palette.grey[200],
        hoverBackgroundColor: theme.palette.grey[200],
        hoverBorderColor: theme.palette.grey[200],
        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        stacked: false,
      },

      x: {
        stacked: false,
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales / Revenue
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
});

function ClientProfile() {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, lg: 4, xl: 3 }}>
          <Details />
          <About />
          <Elsewhere />
        </Grid>
        <Grid size={{ xs: 12, lg: 8, xl: 9 }}>
          {/*<SalesRevenue />
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Earnings />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Orders />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Revenue />
            </Grid>
          </Grid>*/}
          <Products />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ClientProfile;
