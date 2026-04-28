import React from "react";
import { matchPath, useParams } from "react-router-dom";
import SidebarNavListItem from "./SidebarNavListItem";
import SidebarNavList from "./SidebarNavList";
import SidebarClientList from "./SideBarClientList";
import SidebarClientListItem from "./SidebarClientListItem";
import slugify from "slugify";

const reduceClientRoutes = (props) => {
  const { items, page, depth, currentRoute } = props;

  const client = useParams()

  if (page.children) {
    const open = false

    items.push(
      <SidebarClientListItem
        depth={depth}
        icon={page.icon}
        key={page.name}
        badge={page.badge}
        open={open}
        title={page.name}
        href={page.href?page.href:`${page.name}/overview`}
      >
        <SidebarClientList depth={depth + 1} pages={page.children} />
      </SidebarClientListItem>
    );
  } else {
    items.push(
      <SidebarClientListItem
        id={page.id}
        depth={depth}
        href={page.href?page.href:`/${page.id}/${slugify(page.name)}/overview`}
        icon={page.icon}
        key={page.name}
        badge={page.badge}
        title={page.name}
      />
    );
  }

  return items;
};

export default reduceClientRoutes;
