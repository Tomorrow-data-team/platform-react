import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import Chart from "react-apexcharts";
import axios from "axios";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import Loading from "@/layouts/Loading";
import Error2 from "@/layouts/Error2";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

function transformData(raw, selectedType) {
  // 1. Filter by Type
    const excludedChannels = ['__INTERCEPT__', 'brand_cost', 'bing_pmax'];

    const filtered = raw.filter(item =>
    item.Type === selectedType &&
    !excludedChannels.includes(item.Channel)
    );

  // 2. Get unique sorted dates
  const dates = [...new Set(filtered.map(d => d.Date))]
    .sort((a, b) => new Date(a) - new Date(b));

  // 3. Group by channel
  const grouped = filtered.reduce((acc, item) => {
    const key = item.Channel;

    if (!acc[key]) acc[key] = {};

    acc[key][item.Date] = Math.max(parseFloat((item.Weight*1000).toFixed(4)),0);

    return acc;
  }, {});

  // 4. Build series
  const data = Object.keys(grouped).map(channel => ({
    name: channel,
    data: dates.map(date => grouped[channel][date] ?? 0)
  }));

  // 5. Format categories
  const categories = dates.map(d =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    })
  );

  return { data, categories };
}

const LineChart = ({ theme, model }) => {


    const [options, setOptions] = useState({})
  const [bsi, setBsi] = useState()
  const [status, setStatus] = useState('idle')
    function getBsi(){
        setStatus('loading')
    axios.get(`https://platform-flask-production-28c4.up.railway.app/bq/bsi/all/1`, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
        //const data = formulateData(response.data)
        const { data, categories } = transformData(response.data, model);
        console.log(categories, data)
        setBsi(data)
        setOptions({
            chart: {
            zoom: {
                enabled: false,
            },
            },
            dataLabels: {
            enabled: false,
            },
            stroke: {
            width: 3,        // same thickness for all
            curve: "smooth",
            dashArray: 0     // solid lines (no dashes)

            },
            markers: {
            size: 0,
            style: "hollow", // full, hollow, inverted
            },
            xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'May']
            },
            yaxis: {
            labels: {
                formatter: (val) => val.toFixed(0) // change to 0, 1, 2, etc.
            }
            },
            grid: {
            borderColor: "#f3ebeb",
            },

        })
        setStatus('success')
        console.log(response.data)
        })
        .catch(error => {
            setStatus('error')
        console.error(error);
        });}

    useEffect(getBsi, [model])

        if(status == 'loading') return <Loading />
        if(status == 'error') return <Error2 />
  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Historical BSI
        </Typography>


        <Spacer mb={6} />

        <ChartWrapper>
          <Chart options={options} series={bsi} type="line" height="350" />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(LineChart);
