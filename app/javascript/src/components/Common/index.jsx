import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className="shadow border-text-gray-400 border-b border-solid bg-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex h-10 justify-between">
        <div className="flex px-2 lg:px-0">
          <span
            name="Scribble"
            className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-gray-800"
          >
            Scribble
          </span>
          <NavItem name="Articles" path="/" />
          <NavItem name="Settings" path="/settings/" />
        </div>
        <div className="flex items-center justify-end">
          <Button icon={ExternalLink} label="Preview" style="secondary" />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
