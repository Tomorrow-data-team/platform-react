import React from "react"
import * as Yup from "yup";
import styled from "@emotion/styled";
import { useState } from "react";
import { ContentCutOutlined, Search, YouTube } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { youtubeSearch } from "api/utilities";
import YoutubeList from "./YoutubeList";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import {
    IconButton,
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  TextField as MuiTextField,
  CardHeader,
} from "@mui/material";
import { spacing } from "@mui/system";
import Loading from "@/layouts/Loading";
import Error2 from "@/layouts/Error2";

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;

`;

const Brand = styled.div`
  display: inline-block;
  position:relative;
  padding-right:10;
`;

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const columns={'search_term':{'title':'Search Term', 'required':true},
'start_date':{'title':"Start Date", 'required':false},
'end_date':{'title':"End Date", 'required':false},
}

const initial={'search_term':'', 'start_date':"", 'end_date':""}

export default function YoutubeSearch(){
    let navigate = useNavigate()
    const searchObj = {'search_term':'', 'start_date':'','end_date':''}
    const [data,setData] = useState()
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        const url=`search?search_term=${encodeURIComponent(searchObj['search_term'])}&start_date=${searchObj['start_date']}&end_date=${searchObj['end_date']}`
        console.log('running')
        navigate(url)
    }

    const handleChange = (key, e) =>{
        if(e.target){
            searchObj[key]=e.target.value
        }
        else{
            searchObj[key]=dayjs(e).format('YYYY-MM-DD')
        }
        console.log(searchObj)

    //e.preventDefault()
    //setDisabled(false)
  }
  if(status=='success') return <YoutubeList data={data} />
  if(status=='loading') return <Loading />
  if(status=='error') return <Error2/>

  return (               
    <Card m={4}>
        <CardContent>
            <CardHeader
            avatar={
            <Brand>
            <BrandIcon
                alt="Youtube Icon"
                src="/static/img/brands/youtube.svg"
                style={{ height: "30px" }}
            />
            </Brand>
            
            }
            title="Search Console" />
            <div>
              <form onSubmit={handleSubmit}>
                <Grid m={5}>
                  <TextField
                    name="search_term"
                    label="Search Term"
                    fullWidth
                    onChange={(newValue)=>handleChange('search_term',newValue)}
                    required={true}
                    variant="outlined"
                    my={2}
                    />
                </Grid>
                <Grid container spacing = {5} m={5} sx={{justifyContent:"space-between"}}>
                    <Grid size={{xs: 12, lg: 5}}>
                        <DatePicker
                        format="dd-MM-yyyy"
                        sx={{width:'100%'}}
                        key="start_date"
                        name="start_date"
                        label="Start Date"
                        onChange={(newValue)=>handleChange('start_date',newValue)}
                        />
                    </Grid>
                    <Grid size={{xs: 10, lg: 5}}>
                        <DatePicker
                        format="dd-MM-yyyy"
                        sx={{width:'90%'}}
                        key="end_date"
                        name="end_date"
                        label="End Date"
                        onChange={(newValue)=>handleChange('end_date',newValue)}
                        />
                    </Grid>
                    <Grid alignContent="right" size={{xs: 2, lg: 1}}>
                    <Button
                    sx={{float:'right', width:'10px'}}
                        type="submit"
                        variant="contained"
                        color="primary"
                        mt={2}
                    >
                        <Search />
                        </Button>
                  </Grid>
                </Grid>
              </form> 
            </div>
        </CardContent>
    </Card>

  );
}
