import React, { useEffect, useState } from "react";

import { ExternalLink } from "neetoicons";
import { Button, PageLoader, Typography } from "neetoui";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Route, Switch, useParams } from "react-router-dom";

import categoriesApi from "apis/admin/categories";

import Detail from "./Detail";

const SideMenu = ({ history, sitename }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(null);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const params = useParams();
  const [paramCategory, paramsSlug] = params[0].split("/");
  const handleClick = ({ title, body, date, slug }, category) => {
    setTitle(title);
    setBody(body);
    setDate(date);
    setActive(title);
    setSlug(slug);
    setCategory(category);
    history.push(`/public/${category}/${slug}`);
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      detailsOfFirstArticle(categories);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const findFirstNotNullArticleValues = (...args) =>
    args
      .filter(({ articles }) => articles.length > 0)
      .filter(({ slug }) => slug !== null)[0];

  const detailsOfFirstArticle = categories => {
    if (params[0] === "") {
      const category = findFirstNotNullArticleValues(...categories);
      history.push(
        `/public/${category.category}/${category["articles"][0]["slug"]}`
      );
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !loading) {
      detailsOfFirstArticle(categories);
      const filteredCategories = categories.filter(
        category => category["category"] === paramCategory
      );
      const articleOfCorrespondingCategory =
        filteredCategories[0].articles.filter(
          ({ slug }) => slug === paramsSlug
        )[0];

      setTitle(articleOfCorrespondingCategory["title"]);
      setBody(articleOfCorrespondingCategory.body);
      setDate(articleOfCorrespondingCategory.created_at);
      setActive(articleOfCorrespondingCategory.slug);
      setCategory(filteredCategories[0]["category"]);
    }
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <nav className="shadow border-text-gray-400 border-b mx-auto border-solid bg-white">
        <Typography className="p-2 text-center text-gray-700" style="h4">
          {sitename}
        </Typography>
      </nav>
      <div className="flex h-screen w-full">
        <Sidebar>
          <Menu>
            {categories.map((category, idx) => (
              <SubMenu
                defaultOpen={category["category"] === paramCategory}
                key={idx}
                label={category["category"]}
              >
                {category["articles"].map(
                  ({ title, body, created_at, slug }, idx) =>
                    slug && (
                      <MenuItem
                        className={`${active === slug && "text-indigo-600"}`}
                        key={idx}
                        active={
                          category["category"] === paramCategory &&
                          title === paramsSlug
                        }
                        onClick={() =>
                          handleClick(
                            { title, body, created_at, slug },
                            category["category"]
                          )
                        }
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
            path={`/public/${category}/${slug}`}
            render={props => (
              <Detail
                {...props}
                body={body}
                category={category}
                date={date}
                history={history}
                title={title}
              />
            )}
          />
        </Switch>
        <div className="h-32 w-32">
          <div className="right-1 sticky mr-12 h-16 w-16">
            <Button
              icon={ExternalLink}
              label="Home"
              style="secondary"
              tooltipProps={{
                content: "Go To Dashboard",
                position: "bottom",
              }}
              onClick={() => history.push("/")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
