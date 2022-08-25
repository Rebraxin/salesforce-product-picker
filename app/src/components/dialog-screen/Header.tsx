import { Button, Flex, Heading, MenuDivider } from "@contentful/f36-components";
import React, { Fragment } from "react";

const Header = (props: any) => {
  const { closeDialogHandler, type } = props;

  return (
    <Fragment>
      <Flex
        marginBottom="spacingM"
        fullWidth
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading marginBottom="none">
          Select {type === "categories" ? "category" : "product"}
        </Heading>
        <Button
          size="small"
          variant="positive"
          aria-label="Save Products"
          onClick={closeDialogHandler}
        >
          Save changes
        </Button>
      </Flex>
      <MenuDivider />
    </Fragment>
  );
};

export default Header;
