import React, { useState } from "react";
import { Flex, Table, Text } from "@contentful/f36-components";

const { Row, Cell } = Table;

export const DialogTableRow = () => {
  const [isSelected, setIsSelected] = useState(false);

  const onCLickHandler = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Row onClick={onCLickHandler} isSelected={isSelected}>
      <Cell width="100px">
        <img
          src="https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png"
          alt="Logo"
        />
      </Cell>
      <Cell>
        <Flex flexDirection="column" justifyContent="center">
          <Text>Label</Text>
          <Text>Ref</Text>
        </Flex>
      </Cell>
    </Row>
  );
};
