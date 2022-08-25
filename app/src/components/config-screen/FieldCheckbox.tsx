import { Box, Checkbox, Stack, Text } from "@contentful/f36-components";
import React, { Fragment } from "react";
import { variantTypes } from "../../data/config-fields";
import ContentFieldRadio from "./ContentFieldRadio";

interface FieldCheckboxProps {
  id: string;
  name: string;
  parameters: any;
  setParameters: any;
}

const FieldCheckbox = (props: FieldCheckboxProps) => {
  const { id, name, parameters, setParameters } = props;

  const params = parameters?.configFields;
  const isChecked = !!params.filter((el: any) => el.id === id).length;

  const onChangeHandler = () => {
    if (!params.filter((el: any) => el.id === id).length) {
      // Push new entry
      params.push({
        id,
        type: variantTypes[0],
      });
    } else {
      const index = params.findIndex((el: any) => el.id === id);
      // Then we delete the item
      params.splice(index, 1);
    }

    setParameters({
      ...parameters,
      configFields: params,
    });
  };

  return (
    <Box marginBottom="spacingM">
      {name && (
        <Checkbox
          isChecked={isChecked}
          name={`field-${id}-controlled`}
          id={`field-${id}-controlled`}
          helpText={`Field ID : ${id}`}
          onChange={() => onChangeHandler()}
        >
          <Text style={{ textTransform: "capitalize" }}>{name}</Text>
        </Checkbox>
      )}
      {isChecked && (
        <Stack
          marginLeft="spacingL"
          marginTop="spacingXs"
          marginBottom="spacingM"
        >
          {variantTypes.map((type: any, index: number) => (
            <Fragment key={type}>
              <ContentFieldRadio
                id={id}
                parameters={parameters}
                setParameters={setParameters}
                type={type}
              />
            </Fragment>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FieldCheckbox;
