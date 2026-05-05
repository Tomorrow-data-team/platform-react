import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Outlet, useLocation } from "react-router-dom";

import {
  Box,
  CssBaseline,
  Paper as MuiPaper,
  Container as MuiContainer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "@/components/GlobalStyle";
import Navbar from "@/components/navbar/Navbar";
import navItems from "@/components/sidebar/dashboardItems";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/Footer";
import Settings from "@/components/Settings";
import utils from "@/components/sidebar/utilItems";
import SidebarNew from "@/components/newSidebar/Sidebar";
const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  width: ${(props) => (props.collapsed ? "90px" : "260px")};
  flex-shrink: 0;

  height: 100vh;
  overflow-y: auto;

  transition: width 0.3s ease;

`;


const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* IMPORTANT: prevents overflow issues */

  transition: all 0.3s ease;
`;

const Paper = styled(MuiPaper)(spacing);

const Container = styled(MuiContainer)`
  height: 100%;
`;

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;

  }
`;

const Dashboard = ({ children }) => {
  const router = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer collapsed={collapsed}>
        <SidebarNew collapsed={collapsed} setCollapsed={setCollapsed}/>


      </Drawer>
      <AppContent collapsed={collapsed}>
        {<Navbar onDrawerToggle={handleDrawerToggle} />}
        <MainContent px={isLgUp ? 10 : 5} pt={isLgUp ? 10 : 5}>
          <Container maxWidth="xl">
            {children}
            <Outlet />
          </Container>
        </MainContent>
       <Footer />
      </AppContent>
      {/*<Settings />*/}
    </Root>
  );
};

export default Dashboard;
