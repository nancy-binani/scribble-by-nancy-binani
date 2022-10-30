import React from "react";

import { MenuBar } from "neetoui/layouts";

import { MENU_OPTIONS } from "./constants";

const SideMenu = ({ history, menu }) => {
  const selectedMenu =
    menu === "Manage%20Categories" ? "Manage Categories" : menu;
  const handleClick = label => {
    const searchTerm =
      label !== "Manage Categories" ? label : "Manage%20Categories";
    history.push({
      pathname: "/settings",
      search: `?tab=${searchTerm}`,
    });
  };

  return (
    <div className="flex">
      <MenuBar showMenu>
        {MENU_OPTIONS.map(({ label, description, id }) => (
          <MenuBar.Item
            className={`${selectedMenu === label && "bg-white"}`}
            description={description}
            key={id}
            label={label}
            onClick={() => handleClick(label)}
          />
        ))}
      </MenuBar>
    </div>
  );
};

export default SideMenu;
