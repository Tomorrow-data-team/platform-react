import { useState, useEffect } from "react"
import React from "react"   
import { Grid, Box, CircularProgress } from "@mui/material" 
import Stats from "./Stats"
import axios from "axios"
import { green, red } from "@mui/material/colors";
import TempStatsChips from "./TempStatsChips"

const currency = ["Revenue", "Spend"]

const chipOrder = ['Spend', 'Impressions', 'Clicks', 'Purchases', "Revenue"]

export default function StatsChips({date, menuItems, setDateText, setMainLoading}){
  const [loading, setLoading] = useState(true)
  const [updatedDate, setUpdatedDate] = useState()

  const [totals, setTotals] = useState()

return(
    <>
      {loading?
      <Box display="flex" justifyContent="center" my={6}>
        <CircularProgress />
      </Box>:
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
            amount={currency.includes(key)? '£'+parseFloat(totals[0][key].toFixed(0)).toLocaleString(): parseFloat((totals[0][key].toFixed(0))).toLocaleString()}
            chip={menuItems[updatedDate]['chip']}
            percentagetext={(((totals[0][key]-totals[1][key])/totals[1][key])*100).toFixed(2)+'%'}
            percentagecolor={totals[0][key]>=totals[1][key]?green[500]:red[500]}
            text={menuItems[updatedDate]['text']}
            //percentagecolor={green[500]}
          />
        </Grid> )})}</Grid>}
        </>
    )

}