import React from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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
  Card as MuiCard,
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
  CardContent,
} from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  MoreVert,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.active && green[500]};
  background: ${(props) => props.inactive && orange[700]};
  color: ${(props) =>
    (props.active || props.inactive) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
  padding: 4px,
`;

function createData(
  customer,
  customerEmail,
  customerAvatar,
  status,
  amount,
  id,
  date
) {
  return { customer, customerEmail, customerAvatar, status, amount, id, date };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "name", alignment: "left", label: "Client Name" },
  { id: "active", alignment: "center", label: "Status" },
  { id: "Settings", alignment: "right", label: "Settings" },
  { id: "Quick Actions", alignment: "right", label: "Quick Actions"},
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/*<TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>*/}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      {/*<ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            UCID
          </Typography>
        )}
      </ToolbarTitle>*/}
      <Spacer />
      <div>
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" size="large">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
      </div>
    </Toolbar>
  );
};

export default function EnhancedTable({active}) {
    console.log(active)
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  //const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [loaded, setLoaded] = useState(false)

  const [emptyRows, setEmptyRows] = useState(0)

  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/clients/all`, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        setClients(response.data);
        console.log(response.data)
        setEmptyRows(rowsPerPage - Math.min(rowsPerPage, response.data.length - page * rowsPerPage))
        setLoaded(true)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  {/*const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ucid.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };*/}

  {/*const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };*/}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //const isSelected = (id) => selected.indexOf(id) !== -1;


  return (

  <Card mb={6}>
    {/*<CardHeader
      justifycontent="center"
      title="Top Campaigns By Revenue"
    />*/}
    <CardContent>
        <TableWrapper>
        {/*<EnhancedTableToolbar />*/}
        {!loaded ? (
          <TableContainer>
                      <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box></Table>
              </TableContainer>
            ) :(<>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              //numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={clients.length}
            />
            <TableBody>
              {stableSort(clients, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  //const isItemSelected = isSelected(row.index);
                  //const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      //aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${index}`}
                      //selected={isItemSelected}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">
                        <Chip style={{backgroundColor: row.active==1?green[600]:orange[700]}} label ={row.active==1?"Active":"Inactive"}>
                          </Chip>
                        </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="details"
                          component={NavLink}
                          to={`/${row.id}/${row.name}/settings`}
                          //state = {{ ucidId:row.id}}
                  
                          size="large"
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell >
                                            <TableCell align="right" style={{width: '20%'}}>
                        <IconButton
                          aria-label="details"
                          component={NavLink}
                          //state = {{ ucidId:row.id}}
                  
                          size="large"
                        ><MoreVert /></IconButton>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 1 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /></>)}
        </TableWrapper>
        </CardContent>
        </Card>

      
  );}