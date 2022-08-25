import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@contentful/f36-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import CategoriesView from "../components/field-screen/CategoriesView";
import ProductsView from "../components/field-screen/ProductsView";
import { getQuery } from "../utils/get-query";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  sdk.window.startAutoResizer();

  // Config Parameters
  const { configFields } = sdk.parameters.installation;
  // Current Field ID
  const { field } = sdk.ids;
  // Selected Type for the current Field
  const { type } = configFields.find((el: any) => el.id === field);

  const [stateCategories, setStateCategories] = useState<any>(null);
  const [stateProducts, setStateProducts] = useState<any>(null);
  const [cfProductIds, setCfProductIds] = useState<any>(sdk.field.getValue());
  const [cfCategoryIds, setCfCategoryIds] = useState<any>(sdk.field.getValue());
  const [isLoading, setIsLoading] = useState(false);

  const fetchItemsFromSFCC = async (ids?: string[] | number[]) => {
    try {
      const response = await fetch(getQuery(type, sdk, ids)).then((data: any) =>
        data.json()
      );

      if (type === "products") {
        setStateProducts(response?.data);
        setIsLoading(false);
      }
      if (type === "categories") {
        setStateCategories(response?.categories);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const existingIds = sdk.field.getValue();

    setIsLoading(true);
    if (existingIds) {
      if (type === "products") {
        fetchItemsFromSFCC(existingIds);
      }
      if (type === "categories") {
        fetchItemsFromSFCC();
      }
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialogHandler = () => {
    sdk.dialogs
      .openCurrentApp({
        width: "large",
        parameters: {
          fieldProducts: cfProductIds,
          fieldCategories: cfCategoryIds,
        },
      })
      .then(({ selectedIds }) => {
        setIsLoading(true);

        if (type === "products") {
          sdk.field.setValue(selectedIds);
          fetchItemsFromSFCC(selectedIds);
        }

        if (type === "categories") {
          sdk.field.setValue(selectedIds);
          setCfCategoryIds(selectedIds);
          fetchItemsFromSFCC();
        }
      });
  };

  if (isLoading) {
    return (
      <Stack
        marginTop="spacingL"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Flex>
          <Text marginRight="spacingXs">Loading</Text>
          <Spinner />
        </Flex>
      </Stack>
    );
  }

  if (stateCategories?.length > 0 && type === "categories") {
    return (
      <>
        <CategoriesView
          {...{
            sdk,
            stateCategories,
            setStateCategories,
            cfCategoryIds,
            setCfCategoryIds,
          }}
        />
        <Stack alignItems="center" padding="spacingL">
          <Box style={{ width: "70px" }}>
            <img
              src="https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png"
              alt="sfcc logo"
            />
          </Box>
          <Button onClick={() => openDialogHandler()}>Select a Category</Button>
        </Stack>
      </>
    );
  }

  if (stateProducts?.length > 0 && type === "products") {
    return (
      <>
        <ProductsView
          {...{
            sdk,
            stateProducts,
            setStateProducts,
            cfProductIds,
            setCfProductIds,
          }}
        />
        <Stack alignItems="center" padding="spacingL">
          <Box style={{ width: "70px" }}>
            <img
              src="https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png"
              alt="sfcc logo"
            />
          </Box>
          <Button onClick={() => openDialogHandler()}>Select a Product</Button>
        </Stack>
      </>
    );
  }

  return (
    <Stack alignItems="center" padding="spacingL">
      <Box style={{ width: "70px" }}>
        <img
          src="https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png"
          alt="sfcc logo"
        />
      </Box>
      <Button onClick={() => openDialogHandler()}>
        Select a {type === "categories" ? "Category" : "Product"}
      </Button>
    </Stack>
  );
};

export default Field;
