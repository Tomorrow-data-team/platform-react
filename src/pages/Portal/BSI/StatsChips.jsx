import { useState, useEffect } from "react"
import React from "react"   
import { Grid, Box, CircularProgress } from "@mui/material" 
import Stats from "./Stats"
import axios from "axios"
import { green, red } from "@mui/material/colors";
import TempStatsChips from "../Default/TempStatsChips"

const currency = ["Revenue", "Spend"]

const chipOrder = ['Spend', 'Impressions', 'Clicks', 'Purchases', "Revenue"]

export default function StatsChips({bsi}){

const cleaned = React.useMemo(() => {
  if (!bsi?.length) return [];

  const filtered = bsi.filter(d => ['__INTERCEPT__', 'brand_spend'].indexOf(d['processed_input']) ==-1 && d['weight']>=0)
  console.log(bsi.map(d => d.weight));
  const weights = filtered.map(d => Math.log(d.weight + 1e-10));
  const min = Math.min(...weights);
  const max = Math.max(...weights);

  return filtered.map(d => ({
    ...d,
    score: ((Math.log(d.weight + 1e-10) - min) / (max - min)) * 10
  }));
}, [bsi]);


return(
    <>

      <Grid container spacing={6}>
      {cleaned.filter(row => ['__INTERCEPT__', 'brand_spend'].indexOf(row['processed_input']) == -1).map(row=>{
        console.log(row)
        return(
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6,
            lg: 3,
            //xl: "grow",
          }}
        >
          <Stats
            title={row['processed_input'].replace("_"," ")}
            amount={parseFloat(row['score']).toFixed(2)}
            chip='BSI'
            percentagetext={row['p_value']<=0.05?true:false}
            //percentagecolor={totals[0][key]>=totals[1][key]?green[500]:red[500]}
            //text={menuItems[updatedDate]['text']}
            percentagecolor={row['p_value']<=0.05?green[500]:red[500]}
          />
        </Grid> )})}</Grid>
        </>
    )

}