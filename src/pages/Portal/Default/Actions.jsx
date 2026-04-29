import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Box, CircularProgress, Button as MuiButton, Menu, MenuItem, LinearProgress } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

function Actions(props) {
  const { date, setDate, menuItems, setDateText, mainLoading, setLoading } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    if(anchorEl){setAnchorEl(null)}
    else{setAnchorEl(event.currentTarget)}

  };

  const handleClick = (event) => {
        setAnchorEl(null);
    setDate(event.target.dataset.value)
    //setLoading(true)
    //getTotals(event.target.dataset.value)
  };

  const handleClose = (event) => {
    console.log(event.target.dataset.value)
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      {mainLoading?<></>:<>
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
