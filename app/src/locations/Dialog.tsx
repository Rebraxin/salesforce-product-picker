import { Box, Heading } from "@contentful/f36-components";
import { DialogExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import ProductsDialogView from "../components/dialog-screen/ProductsDialogView";
import CategoriesDialogView from "../components/dialog-screen/CategoriesDialogView";

const Dialog = () => {
  const sdk = useSDK<DialogExtensionSDK>();

  const { configFields } = sdk.parameters.installation;

  // Current Field ID
  const { field }: any = sdk.ids;
  // Selected Type for the current Field
  const { type } = configFields.find((el: any) => el.id === field);

  if (type === "products") {
    return <ProductsDialogView {...{ sdk }} />;
  }

  if (type === "categories") {
    return <CategoriesDialogView {...{ sdk, type }} />;
  }

  return (
    <Box>
      <Heading marginBottom="none">Not Found</Heading>
    </Box>
  );
};

export default Dialog;
