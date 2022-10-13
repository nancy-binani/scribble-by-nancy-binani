import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import categoriesApi from "apis/categories";

import { CATEGORY_INITIAL_VALUE } from "./constants";
import CreateCategory from "./CreateCategory";

const SideMenu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

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
      <MenuBar.Block active count={67} label="All" />
      <MenuBar.Block count={15} label="Draft" />
      <MenuBar.Block count={52} label="Published" />
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
            <MenuBar.Block count={27} key={idx} label={category} />
          ))
        : categories.map((category, idx) => (
            <MenuBar.Block count={27} key={idx} label={category} />
          ))}
    </MenuBar>
  );
};

export default SideMenu;
