import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import {
  Button as MuiButton,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;
const options =['Spend', 'Revenue', 'Purchases','Impressions', 'Clicks', "ROAS"]
export default function ChartFilter({choices, setChoices}) {
  const [tempchoice, setTempChoice] = useState(choices)
  const [open, setOpen] = React.useState(false);
  const [metric1, setMetric1] = React.useState();
  const [metric2, setMetric2] = React.useState();


  function handleAccept(){
    setChoices(tempchoice)
    handleClose()
  }
  function handleChange(e, v){
    if(v=='var1'){
      setTempChoice({'var1':e, 'var2':tempchoice['var2']})
    }
    else if(v=='var2'){
      setTempChoice({'var1':tempchoice['var1'], 'var2':e})
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
          <>
            <Button
              //variant="contained"
              //color="primary"
              onClick={handleClickOpen}
            >
              <FilterListIcon />
            </Button>

            <Dialog 
            disableEscapeKeyDown
            open={open}
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      height:'20%',
                      minheight:'100px',
                      maxWidth: "500px",
                          display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',  // Set your width here
                    },
                  },
    }}
            onClose={handleClose}>
              <DialogTitle>Compare Metrics</DialogTitle>
              <DialogContent sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',  // Set your width here
                }}>
                <form>
                    <Paper>

                      <Card>
                  <FormControl>
                    <InputLabel htmlFor="metric1"></InputLabel>
                    <Select
                      native
                      displayEmpty
                      value={tempchoice['var1']}
                      onChange={(e)=>handleChange(e.target.value, 'var1')}
                      input={<Input id="metric1" />}
                    >
                      <option value={tempchoice['var1']} disabled>{tempchoice['var1']}</option>
                      {options.filter(option=>option!=tempchoice['var1']).map(option=>{
                        return(
                          <option disabled={option==tempchoice['var2']?true:false} value={option}>{option}</option>
                        )
                      })}                       
                    </Select>
                    
                  </FormControl>
                  </Card>

                  <Card>
                  <FormControl>
                    <InputLabel htmlFor="metric2"></InputLabel>
                    <Select
                        native
                      value={tempchoice['var2']}
                      onChange={(e)=>handleChange(e.target.value, 'var2')}
                      input={<Input id="metric2" />}
                    >
                      <option value={tempchoice['var2']} disabled>{tempchoice['var2']}</option>
                      {options.filter(option=>option!=tempchoice['var2']).map(option=>{
                        return(
                          <option disabled={option==tempchoice['var1']?true:false} value={option}>{option}</option>
                        )
                      })}                       
                    </Select>
                  </FormControl>
                  </Card>

                  </Paper>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAccept} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>

          </>

  );
}