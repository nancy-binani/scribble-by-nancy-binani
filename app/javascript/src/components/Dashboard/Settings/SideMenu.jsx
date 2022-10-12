import React from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideMenu = () => (
  <div className="flex">
    <MenuBar showMenu>
      <MenuBar.Item
        active
        description="Page Title, Brand Name & Meta Description"
        label="General"
      />
      <MenuBar.Item
        description="Create & configure redirection rules"
        label="Redirections"
      />
      <MenuBar.Item
        description="Edit and Reorder KB Structure"
        label="Manage categories"
      />
    </MenuBar>
  </div>
);

export default SideMenu;
