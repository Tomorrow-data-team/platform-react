import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Line } from "react-chartjs-2";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import {
  Button,
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { spacing } from "@mui/system";
import { alpha } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

import ChartFilter from "./FilterChart";
import { useParams } from "react-router";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 392px;
`;

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

`;

function LineChart({ theme, data }) {

  function formulateLineObject(data){

  if(!data){
    return
  }
  const lineObject = {
    labels: data['labels'],
    datasets: [
      {
        label: choices['var1'],
        fill: true,
        yAxisID: 'left-y-axis',
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875));
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          return gradient;
        },
        borderColor: theme.palette.secondary.main,
        tension: 0.4,
        data: data[choices['var1'].toLowerCase()],
      },
      {
        label: choices['var2'],
        fill: true,
        yAxisID: 'right-y-axis',
        backgroundColor: "transparent",
        borderColor: orange[800],
        borderDash: [4, 4],
        tension: 0.4,
        data: data[choices['var2'].toLowerCase()],
      },
    ],
  }
  return lineObject
  }

function formulateLineOptions(data){
  if(!data){
    return
  }
  const lineOptions={
    grid:{ vertical: true, horizontal: true},
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
      },
      'left-y-axis':{
      title: {
        display: true,
        text: choices['var1']
      },
        type: 'linear',
        beginAtZero: true,
        position: 'left',
      },
      'right-y-axis':{
        type: 'linear',
        beginAtZero: true,
        suggestedMax:(data[choices['var2'].toLowerCase()].reduce((a, b) => Math.max(a, b), -Infinity))*1.2,
        position: 'right',
                grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      title: {
        display: true,
        text: choices['var2']
      }
      }
      
    },
  }
  return lineOptions
  }

  const [choices, setChoices] = useState({"var1":"Revenue", 'var2':"Spend"})
  const [options, setOptions] = useState()
  const [lineData, setLineData] = useState()
  const [arrayData, setArrayData] = useState()
  //console.log(date)

  function getDataArrays(){
    const labels=[]
    const spend=[]
    const revenue=[]
    const purchases=[]
    const clicks =[]
    const impressions = []
    const roas =[]
    for(var item of data){
      //console.log(item)
      labels.push(item['Date'].slice(0,11))
      spend.push(Math.round(item['Spend'] ?? 0))
      revenue.push(Math.round(item['Revenue'] ?? 0))
      purchases.push(Math.round(item['Purchases'] ?? 0))
      impressions.push(Math.round(item['Impressions'] ?? 0))
      clicks.push(Math.round(item['Clicks'] ?? 0))
      //roas.push(item['roas'])
    }
    if(data.length <=1){
      labels.push('')
      labels.unshift('')
      spend.push(null)
      spend.unshift(null)
      revenue.push(null)
      revenue.unshift(null)
      purchases.push(null)
      purchases.unshift(null)
      clicks.push(null)
      clicks.unshift(null)
      impressions.push(null)
      impressions.unshift(null)
      //roas.push(null)
      //roas.unshift(null)
    }
    //console.log(labels)
    //console.log(cost)
    //console.log(revenue)
    const arrays = {labels:labels, spend:spend, revenue:revenue, purchases:purchases, clicks:clicks, impressions:impressions}
      setArrayData(arrays)
      console.log(arrays)
      setLineData(formulateLineObject(arrays))
      setOptions(formulateLineOptions(arrays))
  }


    useEffect(() => {
    if(!arrayData){
      getDataArrays()
    }
    else{
    setLineData(formulateLineObject(arrayData))
    setOptions(formulateLineOptions(arrayData))
    }
    }, [choices])

  return (
    
    <Card mb={6}>
      <CardHeader
        action={
          <SmallButton size="large">
            <ChartFilter choices={choices} setChoices={setChoices}/>
          </SmallButton>
        }
        title={`${choices['var1']} VS ${choices['var2']}`}
      />
      <CardContent>
        <ChartWrapper>
          {lineData&&<Line data={lineData} options={options} />}
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(LineChart);
