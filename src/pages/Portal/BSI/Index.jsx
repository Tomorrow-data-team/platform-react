import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import BsiTable from "./Table";
import {
  Grid,
  Link,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Breadcrumbs as MuiBreadcrumbs,
  Box,
  CircularProgress
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { spacing } from "@mui/system";
import RadarChart from "./Radar";
import BarChart from "./Bar";
const Divider = styled(MuiDivider)(spacing);
import LineChart from "./Line";
import Pie from "./Pie";
import StatsChips from "./StatsChips";
import Choices from "./Choices";

const Typography = styled(MuiTypography)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function formulateData(data){

    const labels=[]
    const values=[]
    for(var item of data){
        if(["__INTERCEPT__", "brand_spend"].indexOf(item["processed_input"])!=-1)
        {continue}
      //console.log(item)
      var str = item['processed_input'].split('_')

        str = str.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

      labels.push(str)
      values.push(item['weight'])
    }
    console.log(labels)
    console.log(data)
    return {'labels':labels, 'data':values}
}

function BSI() {
  const { t } = useTranslation();
  const [bsi, setBsi] = useState()
  const [tableData, setTableData] = useState()
  const [loading, setLoading] = useState(true)
  const [model, setModel] = useState(1)
  const modelOptions = [{'model':1, 'Title':"Seperated"}, {'model':2,"Title":'Combined'}]

  const [options, setOptions] = useState({})
  const [bsi2, setBsi2] = useState()
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
              categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
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

  function getBsi(){
    axios.get(`https://platform-flask-production-28c4.up.railway.app/bq/bsi/1`, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        setTableData(response.data)
        const data = formulateData(response.data)
        setBsi(response.data)
        setLoading(false)
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });}

    useEffect(getBsi, [])

  return (
    <React.Fragment>
      <Helmet title="Analytics Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid>
          <Typography variant="h3" gutterBottom display="inline">
            BSI
          </Typography>
          
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to={`/peacocks/overview`}>
                <Typography >peacocks</Typography>
              </Link>
            <Typography >BSI</Typography>
          </Breadcrumbs>
        </Grid>
              <Grid>
          <Choices model={model} setModel={setModel} modelOptions={modelOptions}/>
        </Grid>

      </Grid>
      <Divider my={6} />
      {loading?
      <Box display="flex" justifyContent="center" my={6}>
        <CircularProgress />
      </Box>:<>
      <Grid container spacing={6}>        
        <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
        <StatsChips bsi={bsi}/>
        </Grid>

        
      </Grid> 
      <Divider my={6} />
          <LineChart model = {model}/>
          </>}
    </React.Fragment>
  );
}

export default BSI;
