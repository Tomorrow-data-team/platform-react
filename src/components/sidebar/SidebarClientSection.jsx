import React from "react";
import styled from "@emotion/styled";
import clientItems from "./clientItems";
import { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase } from "lucide-react";
import { getActiveClients } from "api/clients";

import { Divider, Typography } from "@mui/material";

import SidebarNavList from "./SidebarNavList";
import SidebarClientList from "./SideBarClientList";

const Title = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  padding: ${(props) => props.theme.spacing(4)}
    ${(props) => props.theme.spacing(7)} ${(props) => props.theme.spacing(1)};
  opacity: 0.4;
  text-transform: uppercase;
  display: block;
`;

const SidebarClientSection = (props) => {
  const { title, pages, component: Component = "nav", ...rest } = props;
  const clientsSection = [{
    href: "/",
    icon: Briefcase,
    open: false,
    name: "Clients",
    children: [],
  }]
  const [data, setData] = useState(clientsSection)
  const [status, setStatus] = useState('idle')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState()

  const handleToggle = () => {
    console.log("switch")
    setOpen((state) => !state);
  };
  const fetchData = async () => {
    setStatus('loading')
    try{
      const tempObj = [...data][0]
      const resp = await getActiveClients();
      tempObj.children = resp
      setData([tempObj])
      setStatus("success")
    } catch(err){
      setError(err.message);
      setStatus('error')
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Component {...rest}>
      {status=='success'&& <SidebarClientList pages={data} handleToggle={handleToggle} open={open} depth={0}/>}
    </Component>
    </>
  );
};

export default SidebarClientSection;
