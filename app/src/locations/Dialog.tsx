import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  IconButton,
  MenuDivider,
  Pagination,
  Paragraph,
  Spinner,
  Stack,
  Text,
  TextInput,
} from "@contentful/f36-components";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { IoCloseSharp } from "react-icons/io5";

const hostUrl = "bjch-003.sandbox.us01.dx.commercecloud.salesforce.com";
const clientId = "1d04953b-9a0d-4bbb-b7c6-17dcc6095343";
const siteId = "BgDemoIntl";

// const hostUrlBgDemo = "bjwq-002.sandbox.us01.dx.commercecloud.salesforce.com";
// const clientIdBgDemo = "1d04953b-9a0d-4bbb-b7c6-17dcc6095343";
// const siteIdBgDemo = "BgDemoIntl";

const MAX_COUNT = 24;

const Dialog = () => {
  const sdk = useSDK<DialogExtensionSDK>();

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const fetchProducts = async (searchValue: any) => {
    setIsLoading(true);

    const keyword =
      searchValue === null || searchValue === "" ? "new" : searchValue;

    const url = `https://${hostUrl}/s/${siteId}/dw/shop/v21_9/product_search?client_id=${clientId}&expand=images&q=${keyword}&count=${MAX_COUNT}&start=${
      page * MAX_COUNT
    }`;

    const response = await fetch(url).then((data) => data.json());

    setData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, page]);

  const closeDialogHandler = () => {
    console.log(sdk.parameters.invocation);
    sdk.close();
  };

  const handleInputChange = (value: any) => {
    setSearchValue(value);
  };

  const handlePageChange = (currPage: any) => {
    setPage(currPage);
  };

  const handleCardClick = (pid: any) => {
    const currProduct = data?.hits.find((hit: any) => hit.product_id === pid);
    setSelectedProduct(currProduct);
  };

  const handleSaveProduct = () => {
    sdk.close({ selectedProduct });
  };

  return (
    <Box>
      <Stack
        paddingTop='spacingL'
        paddingBottom='spacingS'
        paddingLeft='spacingXl'
        paddingRight='spacingXl'
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading marginBottom='none'>
          SalesForce CommerceCloud Product Picker
        </Heading>
        <IconButton
          variant='transparent'
          aria-label='Select the date'
          icon={<IoCloseSharp size='20px' />}
          onClick={() => closeDialogHandler()}
        />
      </Stack>
      <MenuDivider />
      <Stack
        paddingTop='spacingL'
        paddingBottom='spacingS'
        paddingLeft='spacingXl'
        paddingRight='spacingXl'
        flexDirection='column'
        alignItems='flex-start'
      >
        <Stack justifyContent='space-between' fullWidth>
          <TextInput
            value={searchValue}
            type='text'
            name='text'
            placeholder='Search for a product...'
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <Button
            isDisabled={!selectedProduct}
            onClick={handleSaveProduct}
            variant='primary'
          >
            Save product
          </Button>
        </Stack>
        <Paragraph>
          Total result:{" "}
          <Text fontWeight='fontWeightDemiBold'>{data?.total}</Text>
        </Paragraph>
      </Stack>
      <MenuDivider />
      {isLoading && (
        <Stack
          padding='spacingXl'
          flexDirection='column'
          alignItems='flex-start'
        >
          <Flex>
            <Text marginRight='spacingXs'>Loading</Text>
            <Spinner />
          </Flex>
        </Stack>
      )}
      {!isLoading && (
        <Box padding='spacingXl'>
          <Grid
            marginBottom='spacingM'
            style={{ width: "100%" }}
            columns='repeat(4, 1fr)'
            columnGap='spacingM'
            rowGap='spacingM'
          >
            {data?.hits.map((product: any, index: number) => (
              <Grid.Item
                key={product.product_id}
                style={{ backgroundColor: "white", height: "auto" }}
              >
                <Card
                  onClick={() => handleCardClick(product.product_id)}
                  isSelected={
                    product.product_id === selectedProduct?.product_id
                  }
                >
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "auto",
                        height: "100%",
                        maxWidth: "unset",
                      }}
                      src={product.image.link}
                      alt={product.image.alt}
                    />
                  </div>
                  <Stack
                    paddingTop='spacingM'
                    flexDirection='column'
                    spacing='none'
                    alignItems='flex-start'
                  >
                    <Text fontWeight='fontWeightDemiBold' fontSize='fontSizeL'>
                      {product.product_name}
                    </Text>
                    <Text fontSize='fontSizeM'>Ref: {product.product_id}</Text>
                  </Stack>
                </Card>
              </Grid.Item>
            ))}
          </Grid>
          {data?.total > MAX_COUNT && (
            <Pagination
              activePage={page}
              onPageChange={handlePageChange}
              itemsPerPage={MAX_COUNT}
              totalItems={data?.total}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Dialog;
