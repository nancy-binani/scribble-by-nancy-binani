import React from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";
import { useParams } from "react-router-dom";

import { MENU_OPTIONS } from "./constants";

const SideMenu = ({ history }) => {
  const params = useParams()[0];
  const handleClick = url => {
    history.push(url);
  };

  return (
    <div className="flex">
      <MenuBar showMenu>
        {MENU_OPTIONS.map(({ label, description, id, url }) => (
          <MenuBar.Item
            className={`${params === label} && bg-white`}
            description={description}
            key={id}
            label={label}
            onClick={() => handleClick(url)}
          />
        ))}
      </MenuBar>
    </div>
  );
};

export default SideMenu;
