import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Link, useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();

  const handleTabChange = (current) => {
    setActiveItem(current);
  };

  const getActiveIndex = (pathname) => {
    switch (pathname) {
      case "/":
        return 0;
      case "/employees":
        return 1;
      case "/newEmployee":
        return 2;
      default:
        return 0;
    }
  };

  const [activeitem, setActiveItem] = useState(
    getActiveIndex(location.pathname)
  );

  const itemRenderer = (item, itemIndex) => (
    <Link to={item.url}
      className="p-menuitem-link flex align-items-center gap-2 text-decoration-none"
      onClick={() => setActiveItem(itemIndex)}
      style={{color: activeitem !== itemIndex ? "black": null}}
    >
      <i  className={item.icon}></i>
      <span className="font-bold" >{item.label}</span>
    </Link>
  );

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      url: "/",
      template: (item) => itemRenderer(item, 0)

    },
    {
      label: "Employees",
      icon: "pi pi-address-book",
      url: "/employees",
      template: (item) => itemRenderer(item, 1)

    },
    {
      label: "New Employee",
      icon: "pi pi-plus",
      url: "/newEmployee",
      template: (item) => itemRenderer(item, 2)

    },
  ];

  return (
    <div className="card">
      <TabMenu
        model={items}
        activeIndex={activeitem}
        onTabChange={(e) => handleTabChange(e.index)}
      />
    </div>
  );
};
