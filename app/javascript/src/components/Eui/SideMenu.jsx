import React, { useEffect, useState } from "react";

import { ExternalLink } from "neetoicons";
import { Button, PageLoader, Typography, Input } from "neetoui";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Route, Switch, useParams } from "react-router-dom";

import categoriesApi from "apis/public/categories";

import Detail from "./Detail";

const SideMenu = ({ history, name }) => {
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(null);
  const [activeArticle, setActiveArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const [paramCategory, paramsSlug] = params[0].split("/");

  const handleClick = (article, category) => {
    setActive(article.title);
    setActiveArticle(article);
    setCategory(category);
    history.push(`/public/${category}/${article.slug}`);
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      const updatedCategories = categories.filter(
        ({ articles }) => articles.length >= 1
      );
      setCategories(updatedCategories);
      detailsOfFirstArticle(categories);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const findFirstNotNullArticleValues = (...categories) => {
    categories = categories.filter(({ articles }) => articles.length > 0);

    categories = categories.map(({ articles, category }) => {
      articles = articles.filter(({ slug }) => slug !== null);

      return [articles, category];
    });

    return categories.filter(category => category[0].length > 0)[0];
  };

  const detailsOfFirstArticle = categories => {
    if (params[0] === "") {
      const category = findFirstNotNullArticleValues(...categories);
      category &&
        history.push(`/public/${category[1]}/${category[0][0]["slug"]}`);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !loading) {
      detailsOfFirstArticle(categories);
      const filteredCategories = categories.filter(
        category => category["category"] === paramCategory
      );
      if (filteredCategories.length) {
        const articleOfCorrespondingCategory =
          filteredCategories[0].articles.filter(
            ({ slug }) => slug === paramsSlug
          )[0];
        setActiveArticle(articleOfCorrespondingCategory);
        setActive(articleOfCorrespondingCategory.slug);
        setCategory(filteredCategories[0]["category"]);
      }
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
      <nav className="shadow border-text-gray-400 border-b border-solid bg-white p-2">
        <Input
          className="fixed w-56"
          placeholder="Search for articles here"
          onClick={() => setShowModal(true)}
        />
        <Typography className="p-2 text-center text-gray-700" style="h4">
          {name}
        </Typography>
      </nav>
      <div className="fixed flex h-screen w-full overflow-hidden">
        {paramsSlug ? (
          <Sidebar>
            <Menu>
              {categories.map((category, idx) => (
                <SubMenu
                  defaultOpen={category["category"] === paramCategory}
                  key={idx}
                  label={category["category"]}
                >
                  {category["articles"].map(
                    (article, idx) =>
                      article.slug && (
                        <MenuItem
                          key={idx}
                          active={
                            category["category"] === paramCategory &&
                            article.title === paramsSlug
                          }
                          className={`${
                            active === article.slug && "text-indigo-600"
                          }`}
                          onClick={() =>
                            handleClick(article, category["category"])
                          }
                        >
                          {article.title}
                        </MenuItem>
                      )
                  )}
                </SubMenu>
              ))}
            </Menu>
          </Sidebar>
        ) : (
          <div className="flex h-screen w-screen flex-row  justify-center">
            <Typography style="h1">No articles present</Typography>
          </div>
        )}
        <Switch>
          <Route
            path={`/public/${category}/${activeArticle.slug}`}
            render={() => (
              <Detail
                activeArticle={activeArticle}
                categories={categories}
                category={category}
                setShowModal={setShowModal}
                showModal={showModal}
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
