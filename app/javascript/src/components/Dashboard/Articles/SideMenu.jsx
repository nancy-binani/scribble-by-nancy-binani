import React, { useEffect, useState } from "react";

import { Search, Plus, Close } from "neetoicons";
import { PageLoader, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import articleApi from "apis/articles";
import categoriesApi from "apis/categories";

import { CATEGORY_INITIAL_VALUE, MENU_OPTIONS } from "./constants";
import CreateCategory from "./CreateCategory";

const SideMenu = ({
  fetchArticles,
  filtering,
  setFiltering,
  setFilteredList,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(null);
  const [searchCategories, setSearchCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterByStatus = async menu => {
    setActive(menu);
    setFiltering(true);
    setSelectedCategories([]);
    try {
      if (menu === "All") {
        await fetchArticles();
      } else {
        const {
          data: { articles },
        } = await articleApi.filterStatus({ status: menu });
        setFilteredList(articles);
      }
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleFilterByCategories = async category => {
    setActive(category);
    setFiltering(true);
    try {
      const newSelectedCategories = [
        ...new Set([...selectedCategories, category]),
      ];
      setSelectedCategories(Array.from(newSelectedCategories));
      const {
        data: { articles },
      } = await articleApi.filterByCategory({
        category: newSelectedCategories,
      });
      setFilteredList(articles);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    const query = searchTerm;
    setFiltering(true);
    let updatedCategoryList = [...categories];
    updatedCategoryList = categories.filter(
      category =>
        category.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    searchTerm === ""
      ? setSearchCategories(categories)
      : setSearchCategories(updatedCategoryList);
  };

  useEffect(() => {
    fetchCategories();
  }, [createNewCategory]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <MenuBar class showMenu title="Articles">
      {MENU_OPTIONS.map((menu, idx) => (
        <MenuBar.Block
          className={`${active === menu && "bg-white"}`}
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
        placeholder="Type Category & press Enter"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
        onKeyDown={handleSearch}
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
      {filtering && !isSearchCollapsed
        ? searchCategories.map((category, idx) => (
            <MenuBar.Block
              key={idx}
              label={category.category}
              className={`${
                selectedCategories.includes(category.category) && "bg-white"
              }`}
              onClick={() => handleFilterByCategories(category.category)}
            />
          ))
        : categories.map((category, idx) => (
            <MenuBar.Block
              key={idx}
              label={category.category}
              className={`${
                selectedCategories.includes(category.category) && "bg-white"
              }`}
              onClick={() => handleFilterByCategories(category.category)}
            />
          ))}
    </MenuBar>
  );
};

export default SideMenu;
