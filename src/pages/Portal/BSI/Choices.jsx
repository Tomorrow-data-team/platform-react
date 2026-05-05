import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Box, CircularProgress, Button as MuiButton, Menu, MenuItem, LinearProgress } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

function Choices(props) {
  const { model, setModel, modelOptions, mainLoading } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ PUT IT HERE (inside component, before return)
  const selected = modelOptions.find(m => m.model === model);

  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClick = (event) => {
    const value = Number(event.currentTarget.dataset.value);
    setModel(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {mainLoading ? null : (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
          >
            {/* ✅ use it here */}
            {selected?.Title}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {modelOptions.map((item) => (
              <MenuItem
                key={item.model}
                data-value={item.model}
                onClick={handleClick}
              >
                {item.Title}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
}

export default Choices;
