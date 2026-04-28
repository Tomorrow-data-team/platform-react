import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Bar } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography, CardHeader } from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
`;


const BarChart = ({ theme, bsi }) => {
    const normalizedVal=[]
    const normalizedlabel=[]
    console.log(bsi)
    const Max = bsi['data'].reduce((a, b) => Math.max(a, b), -Infinity)
    const Min = bsi['data'].reduce((a, b) => Math.min(a, b), Infinity)
    const median = bsi['data'][(Math.floor(bsi['data'].length/2))]
    console.log(median)
    for(var value of bsi['data']){
        const newVal = Math.max(50+50*((value-median)/(Max-median)), 0)
        normalizedVal.push(newVal)
    }

  const barData = {
    labels: bsi["labels"],
    datasets: [
      {
        label: "BSI",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        hoverBackgroundColor: theme.palette.secondary.main,
        hoverBorderColor: theme.palette.secondary.main,
        data: normalizedVal,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },

    ],
  };

  const options = {
    maintainAspectRatio: false,

    //indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false

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
      <CardHeader
        title="Relative Score"
      />
      <CardContent>
            
        <ChartWrapper height="100%">
          <Bar data={barData} options={options} />
        </ChartWrapper>
        </CardContent>
</Card>
  );
};

export default withTheme(BarChart);
