import React from "react";

import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import { useHistory, NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();
  const handleClick = () => {
    history.push("/public/");
  };

  return (
    <nav className="shadow border-text-gray-400 border-b border-solid bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-10 justify-between">
          <div className="flex inline-flex items-center space-x-4 pt-1 text-sm font-semibold">
            <span className="text-gray-800" name="Scribble">
              Scribble
            </span>
            <NavLink
              exact
              className={`${location.pathname === "/" && "text-indigo-500"}`}
              to="/"
            >
              Articles
            </NavLink>
            <NavLink
              exact
              to="/settings"
              className={`${
                location.pathname === "/settings" && "text-indigo-500"
              }`}
            >
              Settings
            </NavLink>
          </div>
          <div className="flex items-center justify-end">
            <Button
              icon={ExternalLink}
              label="Preview"
              style="secondary"
              tooltipProps={{
                content: "See article details",
                position: "bottom",
              }}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;