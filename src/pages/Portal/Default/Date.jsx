import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import dayjs from "dayjs";
import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  StaticDatePicker,
  DateTimePicker,
  StaticDateTimePicker,
  TimePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function Pickers(props) {
  const { date, setDate } = props;  
  console.log(date)
  return (
    <React.Fragment>


          <DatePicker
            label="Date"
            value={date}
            
            onChange={(newValue) => {
              console.log(newValue)
              setDate(newValue);
            }}
          />

    </React.Fragment>
  );
}
    

export default Pickers;
