import React from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";

const { Menu, MenuItem } = Dropdown;

const Categories = ({
  handleDeleteCategory,
  handleEditCategory,
  category,
  id,
  articles,
}) => (
  <div className="flex justify-between">
    <span>
      <Typography style="h4">{category}</Typography>
      <Typography style="body3">{articles.length} articles</Typography>
    </span>
    <Dropdown customTarget={<MenuVertical color="#1e1e20" size={20} />}>
      <Menu>
        <MenuItem.Button onClick={() => handleEditCategory(category, id)}>
          Edit
        </MenuItem.Button>
        <MenuItem.Button
          style="danger"
          onClick={() => handleDeleteCategory(category, id, articles)}
        >
          Delete
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  </div>
);

export default Categories;
