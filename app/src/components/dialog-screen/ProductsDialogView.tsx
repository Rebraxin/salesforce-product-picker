import React, { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Stack,
  Text,
  TextInput,
} from "@contentful/f36-components";
import { IoCheckmark } from "react-icons/io5";
import Header from "./Header";

const MAX_COUNT = 24;

const ProductsDialogView = (props: any) => {
  const { sdk } = props;

  sdk.window.startAutoResizer();
  const { clientId, siteId, host } = sdk.parameters.installation;
  const { fieldProducts } = sdk.parameters.invocation;

  const [term, setTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>(fieldProducts);
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = setTimeout(async () => {
      const keyword = term === "" ? "new" : term;
      const startPoint = page * MAX_COUNT;

      const url = `https://${host}/s/${siteId}/dw/shop/v21_9/product_search?client_id=${clientId}&expand=images&count=${MAX_COUNT}&start=${startPoint}&q=${keyword}`;

      const response = await fetch(url).then((data) => data.json());

      setProducts(response);
    }, 300);

    return () => clearTimeout(fetchProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, page]);

  const handleProductClick = (id: string) => {
    const tempArr = selectedIds || [];

    if (tempArr.find((el: string) => el === id)) {
      const index = tempArr.indexOf(id);
      tempArr.splice(index, 1);
    } else {
      tempArr.push(id);
    }

    setSelectedIds([...tempArr]);
  };

  const handlePageChange = (currPage: any) => {
    setPage(currPage);
  };

  const closeDialogHandler = () => {
    sdk.close({ selectedIds });
  };

  return (
    <Box padding="spacingL">
      <Header {...{ closeDialogHandler }} />

      <TextInput
        value={term}
        type="text"
        name="text"
        placeholder="Search..."
        onChange={(e) => setTerm(e.target.value)}
      />

      {products?.hits?.map((product: any) => {
        const isItemSelected = selectedIds.find(
          (el: string) => el === product.product_id
        );
        return (
          <Box
            key={product.product_id}
            onClick={() => handleProductClick(product.product_id)}
            style={{
              backgroundColor: isItemSelected && "#007fff25",
              marginTop: "10px",
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              paddingRight="spacingL"
              style={{ position: "relative" }}
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
                    src={product.image.link}
                    alt={product.image.alt}
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
                    {product.product_name}
                  </Text>
                  <Text fontSize="fontSizeS">Ref : {product.product_id}</Text>
                </Stack>
              </Stack>
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
            </Stack>
          </Box>
        );
      })}
      <Box marginTop="spacingL">
        {products?.total > MAX_COUNT && (
          <Pagination
            activePage={page}
            onPageChange={handlePageChange}
            itemsPerPage={MAX_COUNT}
            totalItems={products?.total}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductsDialogView;
