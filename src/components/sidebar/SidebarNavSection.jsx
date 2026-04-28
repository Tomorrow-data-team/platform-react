import React from "react";
import styled from "@emotion/styled";
import clientItems from "./clientItems";

import { Divider, Typography } from "@mui/material";

import SidebarNavList from "./SidebarNavList";
import SidebarClientList from "./SideBarClientList";
import { useParams } from "react-router";

const Title = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  padding: ${(props) => props.theme.spacing(4)}
    ${(props) => props.theme.spacing(7)} ${(props) => props.theme.spacing(1)};
  opacity: 0.4;
  text-transform: uppercase;
  display: block;
`;
const Clients = {clientTitle:'Clients', clientNames:[{title:'Peacocks'},{title:'Prezzo'}]}

const SidebarNavSection = (props) => {
  const { title, pages, component: Component = "nav", ...rest } = props;
  const client = useParams()
  return (
    <>
    <Component {...rest}>
      {/*client && <Title variant="subtitle2">{client.clientId}</Title>*/}
      <SidebarNavList pages={pages} depth={0} />
    </Component>
    </>
  );
};

export default SidebarNavSection;
