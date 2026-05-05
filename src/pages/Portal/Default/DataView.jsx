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
import { useQuery } from "@tanstack/react-query";
import { getTotal, getByCampaign, getByChannel, getDaily } from "api/data";
import Loading from "@/layouts/Loading";
import Error from "@/layouts/Error";
import Error2 from "@/layouts/Error2";


function DataPage({date, menuItems, setDateText, setMainLoading}) {

    const { clientSlug, clientId } = useParams();

    const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['dashboard', clientId, date],
      queryFn: async () => {
        const [total, daily, channel, campaign] = await Promise.all([
          getTotal(clientId, date),
          getDaily(clientId, date),
          getByChannel(clientId, date),
          getByCampaign(clientId, date),
        ]);

        return {
          total,
          daily,
          channel,
          campaign,
        };
      },
      enabled: !!clientId, // prevents running before params exist
    });

const dataTotal = data?.total;
const dataDaily = data?.daily;
const dataChannel = data?.channel;
const dataCampaign = data?.campaign;

  if(isLoading) return <Loading />
  if(isError) return <Error2 error={error} />

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
