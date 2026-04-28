import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Radar } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography, CardHeader } from "@mui/material";
import { lighten } from "@mui/material/styles";
import { spacing } from "@mui/system";
import { orange } from "@mui/material/colors";
import { constrainPoint } from "@fullcalendar/core/internal";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 408px;
`;

function RadarChart({ theme, bsi }) {
    const normalizedVal=[]
    const normalizedlabel=[]
    const Max = bsi['data'].reduce((a, b) => Math.max(a, b), -Infinity)
    const Min = bsi['data'].reduce((a, b) => Math.min(a, b), Infinity)
    var count =-1
    for(var value of bsi['data']){
        count+=1
        if(value <= 0){
            continue
        }
        const newVal = 100*((value)/(Max-Min))
        normalizedVal.push(newVal)
        normalizedlabel.push(bsi['labels'][count])
    }
  const data = {
    labels: normalizedlabel,
    datasets: [
      {
        label: "bsi",
        backgroundColor: lighten(theme.palette.secondary.main, 0.33),
        borderColor: theme.palette.secondary.main,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.secondary.main,
        data: normalizedVal,
      },

    ],
  };

  const options = {
    responsive:true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false,
        }
    },
    elements:{
        line:{tension:0,
            //fill:false
        },
        point:{
            pointStyle:false
        }

    },
    scales:{
        r:{
            ticks:{
                display:false
            },

        }
    }
};

  return (
    <Card mb={6}>

      <CardContent>
            
        <ChartWrapper>
          <Radar data={data} options={options} />
        </ChartWrapper>
        </CardContent>
        </Card>

  );
}

export default withTheme(RadarChart);
