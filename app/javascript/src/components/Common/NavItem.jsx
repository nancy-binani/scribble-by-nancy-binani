import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ iconClass, name, path }) => (
  <NavLink
    exact
    to={path}
    className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-gray-600 hover:text-indigo-500"
  >
    {iconClass && <i className={`${iconClass} text-gray-800`} />}
    {name}
  </NavLink>
);

export default NavItem;
