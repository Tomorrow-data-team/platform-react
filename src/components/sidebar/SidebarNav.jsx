import React from "react";
import styled from "@emotion/styled";
import { Divider, List } from "@mui/material";
import clientItems from "./clientItems";
import { useParams } from "react-router";

import SidebarNavSection from "./SidebarNavSection";
import SidebarClientSection from "./SidebarClientSection";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(0)};
  
`;


const SidebarNav = ({ dashboardItems, utilItems }) => {

  const client = useParams()
  return (
    <Wrapper>
      <List disablePadding>
        <Items>
          <SidebarClientSection
              component="div"
              key={clientItems.title}
              pages={clientItems.pages}
              title={clientItems.title}
            /> 
        </Items>
        <Divider my={6} sx={{ borderBottomWidth: 1, color:"white" }} />
        {client.clientId &&
          <Items>
            <SidebarNavSection
              component="div"
              key={dashboardItems.title}
              pages={dashboardItems.pages}
              title={dashboardItems.title}
              margin-bottom="20px"
            />
          </Items>}
              
        <Divider my={6} sx={{ borderBottomWidth: 1, color:"white" }} />
        {utilItems &&
        <Items>
          <SidebarNavSection
          component="div"
          key={utilItems.title}
          pages={utilItems.pages}
          title={utilItems.title}
          margin-bottom="20px"
        />
        </Items>}
              
        <Divider my={6} sx={{ borderBottomWidth: 1 }} />

      </List>
    </Wrapper>
  );
};

export default SidebarNav;
