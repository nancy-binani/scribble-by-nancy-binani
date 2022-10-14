import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import categoriesApi from "apis/categories";

import { CATEGORY_INITIAL_VALUE, MENU_OPTIONS } from "./constants";
import CreateCategory from "./CreateCategory";

const SideMenu = ({ handleFilter }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [active, setActive] = useState(null);

  const handleClick = menu => {
    setActive(menu);
    handleFilter(menu);
  };

  const fetchCategories = async () => {
    const categoriesArray = [];
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);

      categories.forEach(element => {
        categoriesArray.push(element["category"]);
      });
      setCategories(categoriesArray);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = () => {
    const query = searchTerm;
    setFiltering(true);
    let updatedCategoryList = [...categories];
    updatedCategoryList = categories.filter(
      category => category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    searchTerm === ""
      ? setFilteredList(categories)
      : setFilteredList(updatedCategoryList);
  };

  return (
    <MenuBar class showMenu title="Articles">
      {MENU_OPTIONS.map((menu, idx) => (
        <MenuBar.Block
          className={`${active === menu && "bg-white"}`}
          count={28}
          key={idx}
          label={menu}
          onClick={() => handleClick(menu)}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Plus,
            onClick: () =>
              setCreateNewCategory(createNewCategory => !createNewCategory),
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
      {filtering
        ? filteredList.map((category, idx) => (
            <MenuBar.Block
              count={27}
              key={idx}
              label={category}
              onClick={() => handleClick(category)}
            />
          ))
        : categories.map((category, idx) => (
            <MenuBar.Block
              count={27}
              key={idx}
              label={category}
              onClick={() => handleClick(category)}
            />
          ))}
    </MenuBar>
  );
};

export default SideMenu;
