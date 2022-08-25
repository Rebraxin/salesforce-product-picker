import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Text } from "@contentful/f36-components";
import { IoCheckmark } from "react-icons/io5";
import { getQuery } from "../../utils/get-query";
import Header from "./Header";

const CategoriesDialogView = (props: any) => {
  const { sdk, type } = props;

  sdk.window.startAutoResizer();
  const { fieldCategories } = sdk.parameters.invocation;

  const [selectedIds, setSelectedIds] = useState<string[]>(fieldCategories);
  const [categories, setCategories] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(getQuery(type, sdk)).then((data) =>
        data.json()
      );

      setCategories(response?.categories);
    };

    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = (id: string) => {
    const tempArr = selectedIds || [];

    if (tempArr.find((el: string) => el === id)) {
      const index = tempArr.indexOf(id);
      tempArr.splice(index, 1);
    } else {
      tempArr.push(id);
    }

    setSelectedIds([...tempArr]);
  };

  const closeDialogHandler = () => {
    sdk.close({ selectedIds });
  };

  return (
    <Box padding="spacingL">
      <Header {...{ closeDialogHandler, type }} />

      <Grid
        style={{ width: "100%" }}
        marginTop="spacingXl"
        columns="1fr 1fr"
        rowGap="spacingS"
        columnGap="spacingS"
      >
        {categories?.map((category: any) => {
          const isItemSelected = selectedIds?.find(
            (el: string) => el === category.id
          );
          return (
            <Grid.Item
              key={category.id}
              style={{
                position: "relative",
                cursor: "pointer",
                backgroundColor: isItemSelected && "#007fff25",
                marginTop: "10px",
                border: "1px solid rgba(0,0,0,0.25)",
                borderRadius: "5px",
                padding: "20px 10px",
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{category.name}</Text>
                <Box
                  style={{
                    backgroundColor: "rgba(0,0,0, 0.1)",
                    border: "1px solid rgba(0,0,0, 0.25)",
                    borderRadius: "50%",
                    height: "20px",
                    overflow: "hidden",
                    position: "absolute",
                    right: "6px",
                    top: "6px",
                    width: "20px",
                  }}
                >
                  {isItemSelected && (
                    <Box
                      style={{
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#008539",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IoCheckmark size="15px" />
                    </Box>
                  )}
                </Box>
              </Flex>
            </Grid.Item>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoriesDialogView;
