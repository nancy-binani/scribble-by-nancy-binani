import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => (
  <NavLink
    exact
    to={path}
    className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-gray-600 focus:text-indigo-500"
  >
    {name}
  </NavLink>
);

export default NavItem;
