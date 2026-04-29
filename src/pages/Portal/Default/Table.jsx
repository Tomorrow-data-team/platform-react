import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { MoreVertical } from "lucide-react";
import { Facebook, Google } from "@mui/icons-material";
import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  Box,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardContent,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useParams } from "react-router";
import getPlatformInfo from "@/utils/PlatformIcons";
import { DataGrid } from '@mui/x-data-grid';


const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
  padding: 4px,
`;

// Data
let id = 0;
function createData(name, start, end, state, assignee) {
  id += 1;
  return { id, name, start, end, state, assignee };
}
const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;
`;

const Brand = styled.div`
  display: inline-block;
  position:relative;
`;

  const columns = [
  { field: "Campaign", headerName: "Campaign", width: 450, editable: false, visible:false},
    { field: "Icon", headerName: "", width: 30, editable: false, renderCell:(props)=>{return(props.row.Platform    ?                   
                          <Brand>
                            <BrandIcon
                              alt={props.row.Platform}
                              src={getPlatformInfo(props.row.Platform)['src']}
                              style={{ height: "30px" }}
                            />
                          </Brand>:<></>)}},
  { field: "Platform", headerName: "Platform", width: 200, editable: false },
  { field: "Spend", headerName: "Spend", width: 150, editable: false, renderCell:(props)=>{return '£'+parseFloat(props.row.Spend.toFixed(0))}},
  { field: "Clicks", headerName: "Clicks", width: 150, editable: false },
  { field: "Impressions", headerName: "Impressions", width: 150, editable: false },
  { field: "Purchases", headerName: "Purchases", width: 150, editable: false, renderCell:(props)=>{return +parseFloat(props.row.Purchases.toFixed(0))}},
  { field: "Revenue", headerName: "Revenue", width: 150, editable: false, renderCell:(props)=>{return '£'+parseFloat(props.row.Revenue.toFixed(0))}},
];
  
export default function CampaignTable (props) {
    const { data } = props

  const rows = data.map((row, index) => ({
    ...row,
    id: index,
  }))

  return(

  <Card mb={6}>
    <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              sx={{border:'none'}}
              //showToolbar
              //pageSizeOptions={[5]}
              //checkboxSelection
              disableRowSelectionOnClick
            />
          
    </div>
  </Card>
);}

