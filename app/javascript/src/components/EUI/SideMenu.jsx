import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Route, Switch, useParams } from "react-router-dom";

import categoriesApi from "apis/categories";

import Detail from "./Detail";

const SideMenu = ({ history }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const params = useParams();
  const [paramCategory, paramTitle] = params[0].split("/");
  const handleClick = ({ title, body, created_at }) => {
    setTitle(title);
    setBody(body);
    setCreated_at(created_at);
    setActive(title);
    history.push({
      pathname: `/public/${category}/${title}`,
      state: { title, body, created_at },
    });
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      const cat = categories.filter(
        category => category["category"] === paramCategory
      );

      const val = cat[0].assigned_articles.filter(
        item => item["title"] === paramTitle
      );
      setTitle(val[0].title);
      setBody(val[0].body);
      setCreated_at(val[0].created_at);
      setActive(val[0].title);
      setCategory(cat[0]["category"]);
    }
  }, [categories, paramCategory, paramTitle]);

  useEffect(() => {
    fetchCategories();
    if (params[0] === "") {
      history.push({
        pathname: `/public/Scribble/abc`,
        state: { title: "", body: "", created_at: "" },
      });
    }
  }, [history, params]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar>
        <Menu>
          {categories.map((category, idx) => (
            <SubMenu
              defaultOpen={category["category"] === paramCategory && true}
              key={idx}
              label={category["category"]}
              onClick={() => setCategory(category["category"])}
            >
              {category["assigned_articles"].map(
                ({ title, body, created_at }, idx) => (
                  <MenuItem
                    className={`${active === title && "text-indigo-600"}`}
                    key={idx}
                    active={
                      category["category"] === paramCategory &&
                      active === title &&
                      true
                    }
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
      <Switch>
        <Route
          exact
          path={`/public/${category}/${title}`}
          render={props => (
            <Detail
              {...props}
              body={body}
              category={category}
              created_at={created_at}
              title={title}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default SideMenu;
