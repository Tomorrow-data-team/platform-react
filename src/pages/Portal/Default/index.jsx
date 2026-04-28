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
import DataPage from "./DataView";
import { useParams } from "react-router";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);


const menuItems={
  "today": {title:"Today", chip:"Daily", text:"From Yesterday"},
  "yesterday":{title:"Yesterday", chip:"Daily", text:"From previous Day"},
  "7days":{title:"Past 7 Days", chip:"Weekly", text:"From previous Week"},
  "thisweek":{title:"This Week", chip:"Weekly", text:"From this time last week"},
  "lastweek":{title:"Last Week", chip:"Weekly", text:"From previous week"},
  "30days":{title:"Past 30 Days", chip:"Monthly", text:"From previous 30 days"},
  "thismonth":{title:"This Month", chip:"Monthly", text:"From this time last month"},
  "lastmonth":{title:"Last Month", chip:"Monthly", text:"From previous month"},
}

function DataConditionalRender({status, data, error}){
  console.log(status, data, error)
  if (status === 'loading')return <Loading />;
  if (status === 'error') return <Error error={error}/>
  if (status === "success" && data.length === 0) return <BQEmpty />

  return <BQDetails data={data}/>
}

function Dashboard() {
  
  const [dateChoice, setDateChoice] = useState('thisweek')
  const [dateText, setDateText] = useState()
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid>
          <Typography variant="h3" gutterBottom>
            Overview
          </Typography>
          
          {dateText?<>
          <Typography variant="subtitle1">
            {/*<Grid>
            {dateText['start_date']} - {dateText['end_date']} 
            </Grid>*/}

          </Typography></>:<></>}
        </Grid>

        <Grid>
          <Actions date={dateChoice} setDate={setDateChoice} menuItems={menuItems} setDateText={setDateText} setLoading={setLoading} loading={loading}/>
        </Grid>
      </Grid>
      <Divider my={6} />
      
      <DataPage date={dateChoice} menuItems={menuItems} setDateText={setDateText} loading={loading} setMainLoading={setLoading}/>
      
    </React.Fragment>
  );
}

export default Dashboard;
