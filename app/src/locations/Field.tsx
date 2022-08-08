import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@contentful/f36-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { IoCloseSharp } from "react-icons/io5";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();

  console.log(sdk.parameters);

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (pid: any) => {
    const { clientId, siteId, host } = sdk.parameters.installation;

    const url = `https://${host}/s/${siteId}/dw/shop/v21_9/product_search?client_id=${clientId}&expand=images&q=${pid}&`;

    const response = await fetch(url).then((data) => data.json());

    setProduct(response?.hits[0]);
  };

  useEffect(() => {
    if (product?.product_id) {
      sdk.field.setValue(product?.product_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (sdk.field.getValue()) {
      fetchProducts(sdk.field.getValue()).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialogHandler = () => {
    console.log("sdk app >>> ", sdk);
    sdk.dialogs
      .openCurrentApp({
        width: "fullWidth",
        shouldCloseOnEscapePress: true,
        shouldCloseOnOverlayClick: true,
        minHeight: "85vh",
        parameters: { test: true, value: 42 },
      })
      .then(({ selectedProduct }) => setProduct(selectedProduct));
  };

  const handleRemoveProduct = () => {
    sdk.field.setValue(undefined);
    setProduct(null);
  };

  if (isLoading) {
    return (
      <Stack
        marginTop='spacingL'
        flexDirection='column'
        alignItems='flex-start'
      >
        <Flex>
          <Text marginRight='spacingXs'>Loading</Text>
          <Spinner />
        </Flex>
      </Stack>
    );
  }

  if (product) {
    return (
      <Box style={{ marginTop: "10px" }}>
        <Stack
          flexDirection='row'
          justifyContent='space-between'
          paddingRight='spacingL'
        >
          <Stack flexDirection='row'>
            <Box
              style={{
                width: "85px",
                height: "110px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                marginRight: "20px",
              }}
            >
              <img src={product.image.link} alt={product.image.alt} />
            </Box>
            <Stack flexDirection='column' alignItems='flex-start'>
              <Text fontWeight='fontWeightDemiBold' fontSize='fontSizeL'>
                {product.product_name}
              </Text>
              <Text fontSize='fontSizeS'>Ref: {product.product_id}</Text>
            </Stack>
          </Stack>
          <Stack>
            <IconButton
              variant='negative'
              aria-label='Select the date'
              icon={<IoCloseSharp size='20px' />}
              onClick={handleRemoveProduct}
            />
          </Stack>
        </Stack>
      </Box>
    );
  }
  return (
    <Stack alignItems='center' paddingTop='spacingXl'>
      <Box style={{ width: "100px", height: "50px" }}>
        <img
          src='https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png'
          alt='sfcc logo'
        />
      </Box>
      <Button onClick={() => openDialogHandler()}>Select a Product</Button>
    </Stack>
  );
};

export default Field;
