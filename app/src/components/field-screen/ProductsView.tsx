import React from "react";
import { Box, IconButton, Stack, Text } from "@contentful/f36-components";
import { IoCloseSharp } from "react-icons/io5";

const ProductsView = (props: any) => {
  const {
    sdk,
    cfProductIds,
    setCfProductIds,
    stateProducts,
    setStateProducts,
  } = props;

  const handleRemoveItem = (itemId: "string" | "number") => {
    const index = cfProductIds.findIndex((id: string) => id === itemId);

    const tempProducts = stateProducts;
    tempProducts.splice(index, 1);
    setStateProducts([...tempProducts]);

    const tempIds = cfProductIds;
    cfProductIds.splice(index, 1);
    setCfProductIds([...tempIds]);

    sdk.field.setValue(tempIds);
  };

  return (
    <Stack
      spacing="none"
      fullWidth
      flexDirection="column"
      alignItems="flex-start"
    >
      {stateProducts?.map((product: any) => (
        <Box
          key={product.id}
          style={{
            width: "100%",
            marginBottom: "10px",
            border: "1px solid rgba(0,0,0,0.25)",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            paddingRight="spacingL"
          >
            <Stack flexDirection="row">
              <Box
                style={{
                  width: "120px",
                  height: "110px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginRight: "20px",
                }}
              >
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={product?.image_groups[2]?.images[0]?.link}
                  alt={product?.image_groups[2]?.images[0]?.alt}
                />
              </Box>
              <Stack
                flexDirection="column"
                alignItems="flex-start"
                spacing="none"
              >
                <Text
                  fontWeight="fontWeightDemiBold"
                  fontSize="fontSizeL"
                  marginBottom="spacingXs"
                >
                  {product.name}
                </Text>
                <Text
                  fontWeight="fontWeightDemiBold"
                  fontSize="fontSizeM"
                  marginBottom="spacingXs"
                >
                  {product.brand}
                </Text>
                <Text fontSize="fontSizeS">Ref : {product.id}</Text>
              </Stack>
            </Stack>
            <Stack>
              <IconButton
                variant="negative"
                size="small"
                aria-label="Select the date"
                icon={<IoCloseSharp size="20px" />}
                onClick={() => handleRemoveItem(product.id)}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ProductsView;
