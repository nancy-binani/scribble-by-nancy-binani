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
        onCollapse={() => setIsSearchCollapsed(true)}
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
      {categories.map((category, idx) => (
        <MenuBar.Block count={27} key={idx} label={category} />
      ))}
    </MenuBar>
  );
};

export default SideMenu;
