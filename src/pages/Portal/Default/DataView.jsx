import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import Radar from "./Radar";
import {
  Paper,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";
import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";
import CampaignTable from "./Table";
import StatsChips from "./StatChips";
import { useParams } from "react-router";

import { getTotal, getByCampaign, getByChannel, getDaily } from "api/data";
import Loading from "@/layouts/Loading";
import Error from "@/layouts/Error";
import Error2 from "@/layouts/Error2";


function DataPage({date, menuItems, setDateText, setMainLoading}) {

    const client=useParams()
    const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const [dataTotal, setDataTotal] = useState(null);
  const [dataDaily, setDataDaily] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const [dataCampaign, setDataCampaign] = useState(null);

  const fetchAll = async () => {
    setStatus("loading");
    setError(null);

    try {
      const [a, b, c, d] = await Promise.all([
        getTotal(client.clientId, date),
        getDaily(client.clientId, date),
        getByChannel(client.clientId, date),
        getByCampaign(client.clientId, date),
      ]);
      setDataTotal(a);
      setDataDaily(b);
      setDataChannel(c);
      setDataCampaign(d);
      console.log(a,b,c,d)

      setStatus("success");
    } catch (err) {
      console.log(err.response.data.error)
      setError(err.response.data.error || "Something went wrong");
      setStatus("error");
    }
  };

  useEffect(() => {
    console.log("fetching")
    fetchAll();
  }, [date]);

  if(status=='loading') return <Loading />
  if(status=='error') return <Error2 error={error} />

  return (
    <React.Fragment>
      
      <StatsChips data={dataTotal} date={date} menuItems={menuItems} setDateText={setDateText} setMainLoading={setMainLoading}/>
      <Grid container spacing={6}>
        <Grid size={{xs: 12, lg: 8}}>
          <LineChart data={dataDaily} />  
        </Grid>
        <Grid size={{xs: 12, lg: 4}}>
          <Radar data={dataChannel} />
        </Grid>
      </Grid>
      
      <Grid container spacing={6}>
        <Grid size={{xs: 12, lg: 12}}>
          <CampaignTable data={dataCampaign}/>  
        </Grid>
      </Grid>
      
      
    </React.Fragment>
  );
}

export default DataPage;
