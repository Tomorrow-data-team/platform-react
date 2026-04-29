import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Pie } from "react-chartjs-2";
import { Radar as RadarChart} from "react-chartjs-2";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { orange, green, red, yellow, grey, blue, indigo } from "@mui/material/colors";
import { lighten } from "@mui/system";
import { transparentize } from "polished";
import {    
  Grid,
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Table,
  Box,
  Button,
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
import ChartFilter from "./FilterChart";
import { normalize } from "polished";
import { useParams } from "react-router";

const Card = styled(MuiCard)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

`;

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;

`;

const Brand = styled.div`
  display: inline-block;
  position:relative;
  padding-right:10;
`;

const brands={'META':{'src':'/static/img/brands/meta.svg','colour': "#6e40f8"},
  'Google Ads':{src:'/static/img/brands/google.svg','colour':"#fb0000"},
  'TikTok':{src:'/static/img/brands/tiktok.svg','colour':"#5e5e5e"},
  'Bing':{src:'/static/img/brands/microsoft.svg','colour':"#4ffb00"},
  'Snapchat':{src:'/static/img/brands/snapchat.svg','colour':yellow[500]},
  'UAC':{src:'/static/img/brands/app.svg','colour':"#ffffff"}
}

const ChartWrapper = styled.div`
  height: 430px;
  position: relative;
  
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
const currency = ['Spend', 'Revenue']
function normalizeVals(array){
    const max = array.reduce((a, b) => Math.max(a, b), -Infinity)
    const min = array.reduce((a, b) => Math.min(a, b), Infinity)
    const median = array[(Math.floor(array.length/2))]
    for(var i in array){
        array[i] = 0.5+(((array[i]-min)/(max-min)-0.5)*0.8)
    }

    return array
}

const Radar = ({ theme, data }) => {
  //console.log(data)
    const [radarData, setRadarData] = useState()
    const [choices, setChoices] = useState({'var1':"Spend", 'var2':'Revenue'})
    const [tempData, setTempData] = useState()

    function formulateDoughnutData(){
    const labels=[]
    const spend=[]
    const revenue=[]
    const purchases=[]
    const clicks =[]
    const impressions = []
    const roas =[]
    for(var item of data){
      labels.push(item['Platform'].slice(0,11))
      spend.push(item['Spend'].toFixed(0))
      revenue.push(item['Revenue'].toFixed(0))
      purchases.push(item['Purchases'].toFixed(0))
      impressions.push(item['Impressions'].toFixed(0))
      clicks.push(item['Clicks'].toFixed(0))
      //roas.push(item['roas'])
    }

    const Nspend=normalizeVals(spend)
    const Nrevenue=normalizeVals(revenue)
    const Npurchases=normalizeVals(purchases)
    const Nimpressions=normalizeVals(impressions)
    const Nclicks=normalizeVals(clicks)
  //const Nroas=normalizeVals(roas)

    const vals = {labels:labels, spend:Nspend, revenue:Nrevenue, purchases:Npurchases, impressions:Nimpressions, clicks:Nclicks}
    console.log(vals)
    setTempData(vals)
    setData(vals)
  }

    function setData(data){
      console.log(data)
      //console.log(data)
    if(!data){
      return null
    }
    setRadarData({
    labels: data.labels,
    datasets: [
      {
        label: choices['var1'],
        //fill:true,
        //backgroundColor: transparentize(0.3, orange[800]),
        borderColor: orange[800],
        pointBackgroundColor: orange[800],
        borderDash: [6, 6],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: orange[600],
        data: data[choices['var1'].toLowerCase()],
      },
            {
        label: choices['var2'],
        fill:true,
        //backgroundColor: transparentize(0.1,theme.palette.secondary.main),
        borderColor: theme.palette.secondary.main,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.secondary.main,
        data: data[choices['var2'].toLowerCase()],
      },
    ],
        })
}
    
    useEffect(() => {
      if(!tempData){
        console.log("initial")
        formulateDoughnutData()
      }
      else{
        console.log("change")
        setData(tempData)
      }}, [choices, ])

  const options = {
    responsive:true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        //position:'right',
        labels:{
        boxHeight:7,
        boxWidth:7
        }}
    },
    elements:{
        line:{tension:0,
            //fill:true
        },
        point:{
            pointStyle:false
        }
    },
    scales:{       
        r:{
            ticks:{
                maxTicksLimit:9,
                display:false
            },
        }
    }
};

  return (
    <Card mb={6} >
      <CardHeader
        action={
            <SmallButton size="large">
              <ChartFilter choices={choices} setChoices={setChoices}/>
            </SmallButton>
        }
        title="Platforms"
      />
      <ChartWrapper styles={{padding:'none'}}>
        <CardContent sx={{paddingTop:'0px'}}>
          <Grid container spacing={6}>       
            <Grid sx={{ height:'200px',width: '100%'}} size={{xs: 4, lg: 12}}>
              {radarData&&<RadarChart data={radarData} options={options} />}
            </Grid>
            <Grid size={{xs: 8, lg: 12}}>
              <Paper sx={{width: '100%', overflow: 'hidden', position:'relative'}}>
                <TableContainer sx={{paddingTop:'5px', overflow:'auto'}}>
                  <Table stickyHeader overflow>
                    <TableHead sx={{backgroundColor:"inherit"}}>
                      <TableRow sx={{backgroundColor:"inherit"}}>
                        <TableCell   sx={{backgroundColor: (theme) => theme.palette.background.paper, zIndex: 1}} align="left"></TableCell>
                        <TableCell   sx={{backgroundColor: (theme) => theme.palette.background.paper, zIndex: 1}}padding="none" align="left">Platform</TableCell>
                        <TableCell   sx={{backgroundColor: (theme) => theme.palette.background.paper, zIndex: 1}}align="center">{choices['var1']}</TableCell>
                        <TableCell   sx={{backgroundColor: (theme) => theme.palette.background.paper, zIndex: 1}}align="center">{choices['var2']}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.filter(channel=>channel["Platform"]!="null").map(channel=>{
                      return(
                      <TableRow>
                        <TableCell padding="none" align="left" p={1} component="th" scope="row">
                          <Brand>
                            <BrandIcon
                              alt={channel["Platform"]}
                              src={brands[channel["Platform"]]['src']?brands[channel["Platform"]]['src']:"null"}
                              style={{ height: "30px" }}
                            />
                          </Brand>
                        </TableCell>
                        <TableCell padding="none">{channel["Platform"]}</TableCell>
                        <TableCell align="center">{currency.indexOf(choices['var1'])!=-1?'£':''}
                          {`${parseFloat(channel[choices['var1']].toFixed(1)).toLocaleString()}`}
                        </TableCell>
                        <TableCell align="center">{currency.indexOf(choices['var2'])!=-1 ?'£':''}
                          {`${parseFloat(channel[choices['var2']].toFixed(1)).toLocaleString()}`}
                        </TableCell>
                      </TableRow>  
                    )})}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </CardContent>
    </ChartWrapper>
  </Card>
  );
};

export default withTheme(Radar);
