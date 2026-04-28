import React from "react";
import { useLocation } from "react-router-dom";

import reduceChildRoutes from "./reduceChildRoutes";
import reduceClientRoutes from "./reduceClientRoutes";

const SidebarClientList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;
  //console.log(pages)

  console.log(pages)
  const childRoutes = pages.reduce(
    (items, page) => reduceClientRoutes({ items, page, currentRoute, depth }),
    []
  );

  return <React.Fragment>
    {childRoutes}
    </React.Fragment>;
};

export default SidebarClientList;
