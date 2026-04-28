import React from "react";
import { useState } from "react";

import { Paper } from "@mui/material";
//import { DateRangePicker } from "mui-daterange-picker";

import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";

export function MyDatePicker() {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});

  const toggle = () => setOpen(!open);

  return (
    <Paper>
    {/*<DateRangePicker
      open={open}
      toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />*/}
    </Paper>
  );

}
