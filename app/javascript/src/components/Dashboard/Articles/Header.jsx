import React, { useState, useEffect } from "react";

import { Button, Checkbox, Dropdown } from "@bigbinary/neetoui";
import { Header as NeetoUIHeader } from "@bigbinary/neetoui/layouts";

import filterApi from "apis/filters";
import PageLoader from "components/PageLoader";

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
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(
    Array(FILTERING_OPTIONS.length).fill(true)
  );

  const handleClick = async () => {
    const updateChecked = FILTERING_OPTIONS.map(filter =>
      columns.includes(filter)
    );
    setChecked(updateChecked);
  };

  const handleUpdate = async updatedColumns => {
    try {
      await filterApi.update({ columns: updatedColumns }, 1);
    } catch (error) {
      logger.error(error);
    }
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
    setLoading(false);
    await handleUpdate(updatedColumns);
  };

  const fetchColumns = async () => {
    try {
      const {
        data: { filters },
      } = await filterApi.list();
      setColumns(filters[1]["columns"]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
            onClick={() => history.push("/articles/create")}
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
