import React from "react";

import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import { useHistory, NavLink } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  //const location = useLocation();
  const handleClick = () => {
    history.push("/public/");
  };

  return (
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
            <NavLink
              exact
              className="mr-3 inline-flex items-center px-1 pt-1 text-sm font-semibold leading-5 text-gray-600 focus:text-indigo-500"
              to="/"
            >
              Articles
            </NavLink>
            <NavLink
              exact
              to="/settings"
              className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-gray-600 focus:text-indigo-500"
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
