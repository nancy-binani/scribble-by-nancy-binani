import React from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideMenu = ({ history }) => (
  <div className="flex">
    <MenuBar showMenu>
      <MenuBar.Block
        active
        description="Page Title, Brand Name & Meta Description"
        label="General"
        onClick={() => history.push("/settings/")}
      />
      <MenuBar.Block
        description="Create & configure redirection rules"
        label="Redirections"
        onClick={() => history.push("/settings/redirections")}
      />
      <MenuBar.Block
        description="Edit and Reorder KB Structure"
        label="Manage categories"
        onClick={() => history.push("/settings/managecategories")}
      />
    </MenuBar>
  </div>
);

export default SideMenu;
