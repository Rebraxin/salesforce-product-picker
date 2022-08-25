import React from "react";
import { Flex, Grid, IconButton, Text } from "@contentful/f36-components";
import { IoCloseSharp } from "react-icons/io5";

const CategoriesView = (props: any) => {
  const { sdk, stateCategories, cfCategoryIds, setCfCategoryIds } = props;

  const handleRemoveItem = (id: any) => {
    const tempArr = cfCategoryIds || [];

    const index = tempArr.indexOf(id);
    tempArr.splice(index, 1);

    setCfCategoryIds([...tempArr]);
    sdk.field.setValue(tempArr);
  };

  return (
    <Grid
      style={{ width: "100%" }}
      marginTop="spacingM"
      columns="1fr 1fr"
      rowGap="spacingS"
      columnGap="spacingS"
    >
      {stateCategories
        .filter((allCatId: any) =>
          cfCategoryIds.find((cfCatId: any) => cfCatId === allCatId.id)
        )
        .map((category: any) => (
          <Grid.Item key={category.id}>
            <Flex
              padding="spacingS"
              justifyContent="space-between"
              alignItems="center"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <Text>{category.name}</Text>
              <IconButton
                onClick={() => handleRemoveItem(category.id)}
                style={{ padding: "0 6px" }}
                size="small"
                variant="negative"
                aria-label="Select the date"
                icon={<IoCloseSharp size="20px" />}
              />
            </Flex>
          </Grid.Item>
        ))}
    </Grid>
  );
};

export default CategoriesView;
