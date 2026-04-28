import { useState, useEffect } from "react"
import React from "react"   
import { Grid, Box, CircularProgress } from "@mui/material" 
import Stats from "./Stats"
import axios from "axios"
import { green, red } from "@mui/material/colors";


const titles = ["Clicks", "Impressions", "Purchases", "Revenue", "Spend"]

export default function TempStatsChips(){

return(
      <Grid container spacing={6}>
        {titles.map(title=>{return(
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
            title={title}
            amount=""
            //chip="Today"
            //percentagetext=""
            percentagecolor={green[500]}
          />
        </Grid>)})}
      </Grid>
    )

}