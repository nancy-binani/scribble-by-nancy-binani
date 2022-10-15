import React, { useState } from "react";

import { Tag } from "@bigbinary/neetoui";
import { Container } from "@bigbinary/neetoui/layouts";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const SideMenu = ({ categories }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [category, setCategory] = useState("");

  const handleClick = ({ title, body, created_at }) => {
    setTitle(title);
    setBody(body);
    setCreated_at(created_at);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar>
        <Menu>
          {categories.map((category, idx) => (
            <SubMenu
              key={idx}
              label={category["category"]}
              onClick={() => setCategory(category["category"])}
            >
              {category["assigned_articles"].map(
                ({ title, body, created_at }, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => handleClick({ title, body, created_at })}
                  >
                    {title}
                  </MenuItem>
                )
              )}
            </SubMenu>
          ))}
        </Menu>
      </Sidebar>
      <Container className="mx-10">
        <h1 className="my-5">{title}</h1>
        {title && (
          <span className="my-3 flex">
            {" "}
            <Tag label={category} />{" "}
            <span className="mx-2 text-gray-600">
              {formatDateAndTime(created_at)}
            </span>
          </span>
        )}
        <p>{body}</p>
      </Container>
    </div>
  );
};

export default SideMenu;
