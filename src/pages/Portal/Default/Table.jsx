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
  padding-right:10px;
`;

const Brand = styled.div`
  display: inline-block;
  position:relative;
  padding-right:10;
`;

const titleOrder = [{'title':'Campaign','align':'left'},
  {'title':'', 'align':'right'},
  {'title': "Platform", 'align':'left'},
  {'title':'Spend', 'align':'center'},
  {'title':'Purchases','align':'center'},
  {'title':'Revenue','align':'center'}]

function formatTableCell(key, campaign, align){
  if(key==""){
    return <TableCell style={{width: '3%'}} padding="none" align={align}>              
              <Brand>
                <BrandIcon
                  alt={campaign["Platform"]}
                  src={brands[campaign['Platform']]['src']?brands[campaign['Platform']]['src']:"null"}
                  style={{ height: "30px" }}
                />{key["Platform"]}
            </Brand>
              </TableCell>
  }
  if(key=="Campaign"){
    return <TableCell style={{width: '30%'}} align={align}>{campaign[key]}</TableCell>
  }
  if(key=="Platform"){
    return <TableCell align={align}>{campaign[key]}</TableCell>
  }
  if(key=="Purchases"){
    return <TableCell align={align}>{parseFloat(campaign[key].toFixed(0)).toLocaleString()}</TableCell>
  }
  else{
    return <TableCell align={align}>£{parseFloat(campaign[key].toFixed(0)).toLocaleString()}</TableCell>
  }
  }
const brands={'META':{'src':'/static/img/brands/meta.svg'},
  'Google Ads':{'src':'/static/img/brands/google.svg'},
  'TikTok':{'src':'/static/img/brands/tiktok.svg'},
  'Bing':{'src':'/static/img/brands/microsoft.svg'},
  'Snapchat':{'src':'/static/img/brands/snapchat.svg'},
  'UAC':{'src':'/static/img/brands/app.svg'}
}

  
export default function CampaignTable (props) {
    const { data } = props

  return(

  <Card mb={6}>
    <CardContent>
      <TableWrapper>
        
        <Table>
          <TableHead>
            <TableRow>
              {titleOrder.map(title=>{
                return(
                <TableCell align={title['align']}>{title['title']=="Campaign"?"Top Performing Campaigns":title['title']}</TableCell>
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
            {data.map((row, index) => (
              
              <TableRow key={index}>
                {titleOrder.map(title =>{
                  return(
                    formatTableCell(title['title'], row, title['align'])
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
    </CardContent>
  </Card>
);}

