import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { MoreVertical } from "lucide-react";
import { Facebook, Google } from "@mui/icons-material";
import { red, green, pink } from "@mui/material/colors";
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
} from "@mui/material";
import { spacing } from "@mui/system";

import getPlatformInfo from "@/utils/PlatformIcons";

import {Check, Close} from '@mui/icons-material';

const Card = styled(MuiCard)(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;
`;
const Brand = styled.div`
  display: inline-block;
  position:relative;
  padding-right:10;
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

function formulateTableCell(channel, key){
  //console.log(channel, key)

  if(key=='icon'){
    const str = channel['processed_input']
    const brandInfo = getPlatformInfo(str)

    return <TableCell style={{width: '3%'}} padding="none">
      {brandInfo?<Brand>
            <BrandIcon
              alt={str}
              src={brandInfo['src']}
              style={{ height: "30px" }}
            />
          </Brand>:<></>}</TableCell>
  }
  if(key=="processed_input"){
    var str = channel['processed_input'].split('_')
    str = str.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
    return <TableCell >{str}</TableCell>
    }
    if(key=="weight"){
      return <TableCell align="center">{channel[key]>0?parseFloat(1000*channel[key].toFixed(5)).toLocaleString():0}</TableCell>
    }
    else{
      return <TableCell align="center">{channel[key]<0.05?<Check sx={{ color: green[500] }}/>:<Close sx={{ color: pink[500] }}/>}</TableCell>
    }
}
const TableWrapper = styled.div`
  overflow-y: scroll;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

// Data
let id = 0;
function createData(name, start, end, state, assignee) {
  id += 1;
  return { id, name, start, end, state, assignee };
}

const titleOrder = {
  'icon':{'title':'', 'align':'left'},
    'processed_input':{'title':'Channel', 'align':'left'},
    'weight':{'title':'BSI','align':'center'},
    'p_value':{'title': "Significant", 'align':'center'},
}
  
export default function BsiTable ({tableData}) {
  return(

  <Card p={6}>
    
    <Paper sx={{ width: '100%', maxHeight: 400, overflow: 'scroll' }}>
      <TableWrapper >
        
        <Table >
          <TableHead>
            <TableRow>
              {Object.keys(titleOrder).map(key=>{
                return(
                <TableCell align={titleOrder[key]['align']} >{titleOrder[key]['title']}</TableCell>
                )
              })}
              {/*<TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Assignee</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.filter(channel => ['__INTERCEPT__', 'brand_spend'].indexOf(channel['processed_input']) == -1 ).map((channel, index) => (
              
              <TableRow key={index}>
                {Object.keys(titleOrder).map(key =>{
                  return(
                    formulateTableCell(channel, key)
                  )
                })}
                {/*<TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.start}</TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.assignee}</TableCell>
              */}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);}

