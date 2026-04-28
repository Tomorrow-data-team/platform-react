import { useState, useEffect } from "react"
import React from "react"   
import { Grid, Box, CircularProgress } from "@mui/material" 
import Stats from "./Stats"
import axios from "axios"
import { green, red, orange } from "@mui/material/colors";
import TempStatsChips from "./TempStatsChips"
import { useParams } from "react-router"

const currency = ["Revenue", "Spend"]

const chipOrder = ['Spend', 'Impressions', 'Clicks', 'Purchases', "Revenue"]

export default function StatsChips({data, date, menuItems, setDateText, setMainLoading}){


  const [loading, setLoading] = useState(true)
  const [updatedDate, setUpdatedDate] = useState()


return(
    <>
      <Grid container spacing={6}>
      {chipOrder.map(key=>{
        return(
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 6,
            lg: 3,
            xl: "grow",
          }}
        >
          <Stats
            title={key}
            amount={currency.includes(key)? '£'+parseFloat(data[0][key].toFixed(0)).toLocaleString(): parseFloat((data[0][key].toFixed(0))).toLocaleString()}
            chip={menuItems[date]['chip']}
            percentagetext={(((data[0][key]-data[1][key])/data[1][key])*100).toFixed(2)+'%'}
            percentagecolor={data[0][key]>=data[1][key]?green[700]:red[400]}
            text={menuItems[date]['text']}
            //percentagecolor={green[500]}
          />
        </Grid> )})}</Grid>
        </>
    )

}