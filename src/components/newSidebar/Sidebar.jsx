import React from "react";

import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
import AccessAlarms from "@mui/icons-material/AccessAlarms";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
{
  /* if you are using react then import link from  */
}
import tmrw from "/public/static/img/tmrw/logo_solo_light.png"
import { Link, useLocation, useParams } from "react-router-dom";
{
  /* if you are using nextjs then import link from  */
}
import { GridSearchIcon } from "@mui/x-data-grid";
import ClientSearch from "./ClientSearch";
import { ListItemButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InsightsIcon from '@mui/icons-material/Insights';
import FlareIcon from '@mui/icons-material/Flare';
import TagIcon from '@mui/icons-material/Tag';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsIcon from '@mui/icons-material/Settings';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ImageWrapper = styled.div`
  width: 100%;
  height: 50px;
  overflow: visible;

  display: flex;
  align-items: center;

  position: relative;

`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  width: 100px;
  height: 100px;

  transition: transform 0.3s ease;

  transform: ${(props) =>
    props.collapsed ? "translateX(0px)" : "translateX(80px)"};
`;

const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: ${props => (!props.collapsed ? "center" : "flex-start")};
  padding:0px;
  padding-top: 5px;
  padding-right: 0px
  width: 100%;
  transition: all 0.5s ease;
  padding-bottom:25px;

  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

`;

const HoverLabel = styled.span`
  position: absolute;
  left: 60px;

  background: rgba(0,0,0,0.85);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;

  opacity: 0;
  transform: translateX(-5px);
  pointer-events: none;

  transition: all 0.2s ease;

  /* only show on hover + collapsed */
  ${props =>
    props.collapsed &&
    `
    .menu-item:hover & {
      opacity: 1;
      transform: translateX(0);
    }
  `}
`;

const ArrowIcon = styled(ArrowBackIosIcon)`
  color:#000000;
  transition: transform 0.5s ease;
  transform: rotate(${props => (props.collapsed ? "180deg" : "0deg")});
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(props) => (props.collapsed ? "90px" : "260px")};
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  z-index: 1200;
  color: #fff;

  /* default text */
  & span,
  & .MuiTypography-root,
  & .MuiMenuItem-root {
    color: #fff !important;
  }
  & .MuiListSubheader-root {
    color: #fff !important;
  }

  /* selected state */
  & .Mui-selected,
  & [aria-selected="true"] {
    background-color: rgb(255, 255, 255) !important;
    color: #01004a !important;
  }

  /* selected text */
  & .Mui-selected span,
  & .Mui-selected .MuiTypography-root,
  & [aria-selected="true"] span,
  & [aria-selected="true"] .MuiTypography-root {
    color: #01004a !important;
  }

  /* icons */
  & svg {
    color: #fff;
  }

  & .Mui-selected svg,
  & [aria-selected="true"] svg {
    color: #01004a !important;
  }
    transition: width 0.3s ease;


  background-image: url("/static/img/tmrw/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledSidebar = styled(Sidebar)`
  width: 100% !important;
  height: auto;
`;

const SidebarScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  /* optional: nicer scroll */
  scrollbar-width: thin;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 65px;
  right: 0px; /* pushes it outside the sidebar */
  width: 20px;
  height: 32px;
  color: #01004a;
  border-radius: 100%;
  border-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1300;
  transition: transform 0.3s ease;
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: ${props => (props.$collapsed ? "center" : "flex-start")};
  padding-left: ${props => (props.$collapsed ? "0" : "16px")};
  padding-right: ${props => (props.$collapsed ? "0" : "16px")};

  min-height: ${props => (props.collapsed ? "44px" : "48px")};

  /* NORMAL STATE */
  border-radius: ${props => (props.collapsed ? "12px" : "0px")};

  /* SELECTED STATE */
  &.Mui-selected {
    border-radius: ${props => (props.$collapsed ? "12px" : "0px")};
    width: ${props => (props.collapsed ? "44px" : "100%")};
    margin: ${props => (props.collapsed ? "6px auto" : "0")};
  }
`;

const Label = styled.span`
  opacity: ${(props) => (props.collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
  white-space: nowrap;
`;

const sidebarItems = {
'':[{'name':'Home', url:'/overview', icon:<CottageOutlinedIcon />}],
'CAMPAIGN SETUP':[
{'name':'Media Planning', url:'/mediaplanning', icon:<FolderIcon />},
{'name':'Campaign Management', url:'/campaigns', icon:<ChecklistIcon />},
{'name':'UCID', url:'/ucid', icon:<TagIcon />},],
'REPORTING':[{'name':'Dashboard', url:'/dashboard', icon:<DashboardIcon />}],
'MODELLING':[{'name':'BSI', url:'/bsi', icon:<FlareIcon />},
{'name':'MMM', url:'/mmm', icon:<InsightsIcon />}],
'SETTINGS':[{'name':'Client Settings', url:'/settings', icon:<SettingsIcon />},
],
'OTHER':[{'name':'All Clients', url:'/settings', icon:<TuneIcon />},
{'name':'Youtube Search', url:'/youtubesearch', icon:<YouTubeIcon />}],

}

const SidebarNew = ({collapsed, setCollapsed}) => {
    const { clientSlug, clientId } = useParams();
  const location = useLocation()
  const pathname = location.pathname
  return (
    <SidebarWrapper collapsed={collapsed}>
      <SidebarScroll>
    <StyledSidebar showProfile={false} >
      <Brand collapsed={collapsed}>
        {/*<BrandIcon />{" "}*/}
        <ImageWrapper collapsed={collapsed}>
        <StyledImage collapsed = {collapsed} src={tmrw}/>
        </ImageWrapper >
        {/*<Box ml={1}>
          Tomorrow {/*<BrandChip {/*label="PRO" />}
        </Box>*/}
      </Brand>
      {!collapsed&&<Menu subHeading="">
          <ClientSearch />
      </Menu>}
      {Object.keys(sidebarItems).map(key=>{
        return(
          <Menu subHeading ={!collapsed?key:''}>
            {sidebarItems[key].map(item=>{
              return(
                <StyledMenuItem
                collapsed={collapsed}
                icon={item.icon}
                component={NavLink}
                link={`/${clientSlug}/${clientId}${item.url}`}
                //badge={true}
                isSelected={pathname.includes(`${item.url}`)?true:false}
              >
                {!collapsed?item.name:''}
                    {collapsed && (
                    <HoverLabel collapsed={collapsed}>
                      {item.name}
                    </HoverLabel>
                  )}
              </StyledMenuItem>
              )
            })

            }

          </Menu>
        )
      })}
    </StyledSidebar>
    </SidebarScroll>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
    <ArrowIcon collapsed={collapsed} fontSize="small"/>
    </ToggleButton>
    </SidebarWrapper>
  );
};

export default SidebarNew;