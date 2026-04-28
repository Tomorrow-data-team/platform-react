import React from "react";
import { matchPath, useParams } from "react-router-dom";

import SidebarNavListItem from "./SidebarNavListItem";
import SidebarNavList from "./SidebarNavList";

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute } = props;
  const client = useParams()
  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={client.slug}
        badge={page.badge}
        open={!!open}
        title={page.title?page.title:client.slug}
        href={page.href}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        clientPath={page.client}
        depth={depth}
        href={`${page.href}`}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
      />
    );
  }

  return items;
};

export default reduceChildRoutes;
