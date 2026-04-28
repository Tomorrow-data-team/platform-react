import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut, Pie } from "react-chartjs-2";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { orange, green, red, yellow, grey, blue, indigo } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Table,
  Box,
  CircularProgress,
  TableBody,
  Paper,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

import getPlatformInfo from "@/utils/PlatformIcons";

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

const brands={'META':{'src':'/public/static/img/brands/meta.svg','colour': "#6e40f8"},
  'Google Ads':{src:'/public/static/img/brands/google.svg','colour':"#fb0000"},
  'TikTok':{src:'/public/static/img/brands/tiktok.svg','colour':"#5e5e5e"},
  'Bing':{src:'/public/static/img/brands/microsoft.svg','colour':"#4ffb00"},
  'Snapchat':{src:'/public/static/img/brands/snapchat.svg','colour':yellow[500]},
  'UAC':{src:'/public/static/img/brands/app.svg','colour':"#ffffff"}
}

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
  margin:7px;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;
function formulateDoughnutData(data){
    const colours=[]
    const normalizedVal=[]
    const normalizedlabel=[]
    var count =-1
    for(var value of BSI['data']){
        count+=1
        if(value <= 0){
            continue
        }
        var info = getPlatformInfo(BSI['labels'][count])
        //console.log(info)
        if(info){
            colours.push(info['colour'])
        }
        else{
            colours.push(grey[500])
        }
        normalizedVal.push(value*100)
        normalizedlabel.push(BSI['labels'][count])
    }
}

function group(BSI){
    var count = -1
    var groups = {'Social' : {'value':0, 'colour':"#003ffb"},
    'Search':{'value':0, 'colour':"#6e40f8"},
    'PMax':{'value':0, 'colour':"#02d863"},
    'Netflix':{'value':0, 'colour':"#DB0000"},
    'Youtube':{'value':0, 'colour':"#cc181e"}}
    var count = -1
    for(var value of BSI['data']){
        value = value*1000
        console.log(value)
        count +=1
        var label = BSI['labels'][count].toLowerCase()
        console.log(label)
        if(value <= 0){
            continue
        }
        if(label.indexOf('youtube')!=-1){
            groups['Youtube']['value']=groups['Youtube']['value']+value
            continue
        }
        else if(label.indexOf('netflix')!=-1){
            console.log('n')
            groups['Netflix']['value']=groups['Netflix']['value']+value
            continue
        }
        else if(label.indexOf('generic')!=-1){
            groups['Search']['value']=groups['Search']['value']+value
            continue
        }
        else if(label.indexOf('pmax')!=-1){
            groups['PMax']['value']=groups['PMax']['value']+value
            continue
        }
        else if(label.indexOf('tiktok')!=-1 || label.indexOf('meta')!=-1){
            groups['Social']['value']=groups['Social']['value']+value
            continue
        }
    }
    return groups
}
const PieChart = ({ theme, BSI }) => {
    const grouped = group(BSI)
    console.log(grouped)
    const keys = Object.keys(grouped)
    const vals = keys.map(function (key) { return parseFloat(grouped[key]['value'].toFixed(5)).toLocaleString(); });
    const colours  = keys.map(function (key) { return grouped[key]['colour']; });
    console.log(vals)

    const pieData ={
    labels: keys,
    datasets: [
      {
        data: vals,
        backgroundColor: colours,
        borderWidth: 1,
        borderColor: theme.palette.background.paper,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },},

    //cutout: "60%",
  };

  return (
    <Card mb={6}>
      {/*<CardHeader

        title="By Division"
      />*/}

      <CardContent>
        <ChartWrapper>
          <Pie data={pieData} options={options} />
        </ChartWrapper>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 225 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Division</TableCell>
                      <TableCell align="center">BSI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keys.map(key=>{
                        return(
                            <TableRow>
                            <TableCell align="left">
                                <Chip style={{'backgroundColor':grouped[key]['colour']}}label={key} />
                            </TableCell>
                            <TableCell align="center">
                                {parseFloat(grouped[key]['value'].toFixed(2)).toLocaleString()}
                            </TableCell>
                            </TableRow>
                        )
                    })}
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </Paper>

      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
