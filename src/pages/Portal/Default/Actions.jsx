import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Box, CircularProgress, Button as MuiButton, Menu, MenuItem, LinearProgress } from "@mui/material";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

import { MyDatePicker } from "./Date new";
import Pickers from "./Date";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

function Actions(props) {
  const { date, setDate, menuItems, setDateText, mainLoading } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)

  const handleOpen = (event) => {
    if(anchorEl){setAnchorEl(null)}
    else{setAnchorEl(event.currentTarget)}

  };

  const handleClick = (event) => {
        setAnchorEl(null);
    setDate(event.target.dataset.value)
    //getTotals(event.target.dataset.value)
  };

  const handleClose = (event) => {
    console.log(event.target.dataset.value)
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      {mainLoading?<Box display="flex"         sx={{
          width: 30,
          height: 30}} position="relative" justifyContent="center" my={0}>
        <CircularProgress size={30} my={2}/>
      </Box>:<>
      {/*<SmallButton size="small" mr={2}>
        <LoopIcon />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <FilterListIcon />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <Pickers />
      </SmallButton>*/}
      <Button
        variant="contained"
        color="secondary"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        onCose={handleClose}
      >
        {menuItems[date]['title']}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        {Object.keys(menuItems).map((key)=>{
          return(
        <MenuItem data-value={key} onClick={handleClick}>{menuItems[key]['title']}</MenuItem>
          )})}
      </Menu></>}
    </React.Fragment>
  );
}

export default Actions;
