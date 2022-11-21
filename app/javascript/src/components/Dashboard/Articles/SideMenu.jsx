import React, { useEffect, useState } from "react";

import { Search, Plus, Close } from "neetoicons";
import { PageLoader, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import articleApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import { CATEGORY_INITIAL_VALUE, MENU_OPTIONS } from "./constants";
import CreateCategory from "./CreateCategory";

const SideMenu = ({ fetchArticles, setArticles }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(null);
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);

  const handleFilterByStatus = async menu => {
    setActive(menu);
    setSelectedCategories([]);
    try {
      if (menu === "All") {
        await fetchArticles();
      } else {
        const {
          data: { articles },
        } = await articleApi.fetch({ status: menu });
        setArticles(articles);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const handleFilterByCategories = async (category, id) => {
    setActive(category);
    let newSelectedCategories = [];
    try {
      if (selectedCategories.includes(id)) {
        newSelectedCategories = selectedCategories.filter(
          selectedCategoryId => id !== selectedCategoryId
        );
      } else {
        newSelectedCategories = [...selectedCategories, id];
      }
      setSelectedCategories(newSelectedCategories);
      const {
        data: { articles },
      } = await articleApi.fetch({
        category_ids: newSelectedCategories,
      });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCount = async () => {
    try {
      const {
        data: { count },
      } = await articleApi.count();
      setCount(count);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setSearchedCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSearch = async searchTerm => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ category: searchTerm });
      setSearchedCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategoriesAndCount = async () => {
    await Promise.all([fetchCount(), fetchCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesAndCount();
  }, [createNewCategory]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <MenuBar class showMenu title="Articles">
      {MENU_OPTIONS.map((menu, idx) => (
        <MenuBar.Block
          className={`${active === menu && "bg-white"}`}
          count={count["count_by_status"][menu.toLowerCase()]}
          key={idx}
          label={menu}
          onClick={() => handleFilterByStatus(menu)}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: !createNewCategory ? Plus : Close,
            onClick: () => {
              setCreateNewCategory(createNewCategory => !createNewCategory);
            },
          },
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        placeholder="Search for Category"
        value={searchTerm}
        onCollapse={() => setIsSearchCollapsed(true)}
        onChange={e => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {createNewCategory && (
        <CreateCategory
          categories={categories}
          category={CATEGORY_INITIAL_VALUE}
          createNewCategory={createNewCategory}
          isEdit={false}
          setCreateNewCategory={setCreateNewCategory}
        />
      )}
      {(isSearchCollapsed ? categories : searchedCategories).map(
        (category, idx) => (
          <MenuBar.Block
            count={count["count_by_category"][category.id]}
            key={idx}
            label={category.category}
            className={`${
              selectedCategories.includes(category.id) && "bg-white"
            }`}
            onClick={() => handleFilterByCategories(category, category.id)}
          />
        )
      )}
    </MenuBar>
  );
};

export default SideMenu;
