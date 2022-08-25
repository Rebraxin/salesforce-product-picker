import {
  Box,
  Heading,
  MenuDivider,
  Paragraph,
  Stack,
} from "@contentful/f36-components";
import { css } from "emotion";
import React, { Fragment } from "react";

const ConfigHeaderImg = () => {
  return (
    <Fragment>
      <Box
        className={css({
          width: "80px",
        })}
      >
        <img
          width="100%"
          height="auto"
          src="https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png"
          alt="Salesforce CommerceCloud Logo"
        />
      </Box>
      <Stack
        flexDirection="column"
        alignItems="center"
        spacing="none"
        className={css({
          textAlign: "center",
          // padding: "0 30px 10px",
        })}
      >
        <Heading marginBottom="spacingS">
          About Salesforce CommerceCloud Product Picker
        </Heading>
        <Paragraph>
          Contentful-App to pick products from Salesforce CommerceCloud indices.
        </Paragraph>
      </Stack>
      <MenuDivider />
    </Fragment>
  );
};

export default ConfigHeaderImg;
