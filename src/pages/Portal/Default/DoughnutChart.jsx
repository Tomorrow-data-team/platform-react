import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Pie } from "react-chartjs-2";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { orange, green, red, yellow, grey, blue, indigo } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Table,
  Box,
  CircularProgress,
  TableBody,
  Paper,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useParams } from "react-router";

const Card = styled(MuiCard)(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;

`;

const Brand = styled.div`
  display: inline-block;
  position:relative;
  padding-right:10;
`;

const brands={'META':{'src':'/static/img/brands/meta.svg','colour': "#6e40f8"},
  'Google Ads':{src:'/static/img/brands/google.svg','colour':"#fb0000"},
  'TikTok':{src:'/static/img/brands/tiktok.svg','colour':"#5e5e5e"},
  'Bing':{src:'/static/img/brands/microsoft.svg','colour':"#4ffb00"},
  'Snapchat':{src:'/static/img/brands/snapchat.svg','colour':yellow[500]},
  'UAC':{src:'/static/img/brands/app.svg','colour':"#ffffff"}
}

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;
function formulateDoughnutData(data){
  const values=[]
  const titles = []
  const colours =[]
  for(var item of data){
    //console.log(item)
    values.push(item['Spend'].toFixed(0))
    titles.push(item['Platform'])
    if(brands[item['Platform']]){
      colours.push(brands[item['Platform']]['colour'])
    }
    else{
      colours.push(grey[500])
    }
  }
  //console.log(titles)
  //console.log(values)
  return [titles, values, colours]
}
const DoughnutChart = ({ theme, date }) => {
  console.log(date)
  const [doughnutData, setDoughnutData] = useState()
  const client = useParams()


    const [loading, setLoading] = useState(true)
    const [channels, setChannels] = useState()

      function getChannelData(){
      axios.get(`http://127.0.0.1:5000/bq/channel/${client.clientId}?daterange=${date}`, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
          setChannels(response.data)
          const resp = formulateDoughnutData(response.data)
          console.log(resp)
          setDoughnutData({
    labels: resp[0],
    datasets: [
      {
        data: resp[1],
        backgroundColor: resp[2],
        borderWidth: 1,
        borderColor: theme.palette.background.paper,
      },
    ],
  })
          setLoading(false)
          console.log(response.data)
        })
        .catch(error => {
          console.error(error);
        });}
  
    useEffect(getChannelData, [date]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },},

    //cutout: "80%",
  };

  return (
    <Card mb={6}>
      {loading ?
  <></>:<>
      <CardHeader

        title="Platforms"
      />

      <CardContent>
        <ChartWrapper>
          {/*<DoughnutInner>
            <Typography variant="h4">+27%</Typography>
            <Typography variant="caption">more sales</Typography>
          </DoughnutInner>*/}
          <Pie data={doughnutData} options={options} />
        </ChartWrapper>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 225 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell padding="none" align="left">Platform</TableCell>
              <TableCell align="right">Spend</TableCell>
              <TableCell align="right">Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {channels.filter(channel=>channel["Platform"]!="null").map(channel=>{
            console.log(options)
            return(
            <TableRow>
              <TableCell padding="none" align="left" p={1} component="th" scope="row">
                            <Brand>
              <BrandIcon
                alt={channel["Platform"]}
                src={brands[channel["Platform"]]['src']?brands[channel["Platform"]]['src']:"null"}
                style={{ height: "30px" }}
              />
            </Brand>
            
              </TableCell>
              <TableCell padding="none">{channel["Platform"]}</TableCell>
              <TableCell align="right">{`£${parseFloat(channel['Spend'].toFixed(0)).toLocaleString()}`}</TableCell>
              <TableCell align="right">{`£${parseFloat(channel['Revenue'].toFixed(0)).toLocaleString()}`}
                {/*<GreenText>+35%</GreenText>*/}
              </TableCell>
            </TableRow>
          )})}</TableBody>
        </Table>
        </TableContainer>
        </Paper>
      </CardContent></>}
    </Card>
  );
};

export default withTheme(DoughnutChart);
