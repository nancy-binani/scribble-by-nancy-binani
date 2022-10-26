import React, { useState } from "react";

import { Button, Checkbox, Dropdown } from "@bigbinary/neetoui";
import { Header as NeetoUIHeader } from "@bigbinary/neetoui/layouts";

import { FILTERING_OPTIONS } from "./constants";

const { Menu, MenuItem } = Dropdown;

const Header = ({
  history,
  searchTerm,
  setSearchTerm,
  handleSearch,
  columns,
  setColumns,
}) => {
  const [checked, setChecked] = useState(
    Array(FILTERING_OPTIONS.length).fill(true)
  );

  const handleClick = async () => {
    const updateChecked = FILTERING_OPTIONS.map(filter =>
      columns.includes(filter)
    );
    setChecked(updateChecked);
  };

  const handleColumns = async (column, idx) => {
    let updatedColumns = [];
    if (checked[idx]) {
      updatedColumns = columns.filter(filter => filter !== column);
    } else {
      updatedColumns = Array.from(columns);
      updatedColumns.push(column);
    }
    setColumns(updatedColumns);
  };

  return (
    <NeetoUIHeader
      actionBlock={
        <>
          <Dropdown
            buttonStyle="secondary"
            label="Columns"
            onClick={handleClick}
          >
            <Menu>
              {FILTERING_OPTIONS.map((item, idx) => (
                <MenuItem.Button
                  key={idx}
                  prefix={
                    <Checkbox
                      checked={checked[idx]}
                      id={idx}
                      onChange={() => {}}
                      onClick={() => handleColumns(item, idx)}
                    />
                  }
                >
                  {item}
                </MenuItem.Button>
              ))}
            </Menu>
          </Dropdown>
          <Button
            icon="ri-add-line"
            label="Add New Article"
            onClick={() => history.push("/articles/new_article")}
          />
        </>
      }
      searchProps={{
        value: searchTerm,
        onChange: e => setSearchTerm(e.target.value),
        onKeyDown: e => handleSearch(e, searchTerm),
      }}
    />
  );
};

export default Header;
