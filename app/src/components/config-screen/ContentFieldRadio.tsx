import { Radio, Text } from "@contentful/f36-components";
import React from "react";

interface ContentFieldRadioProps {
  id: string;
  type: string;
  parameters: any;
  setParameters: any;
}

const ContentFieldRadio = (props: ContentFieldRadioProps) => {
  const { id, type, parameters, setParameters } = props;

  const params = parameters?.configFields;
  const isChecked = !!params.filter(
    (el: any) => el.id === id && el.type === type
  ).length;

  const onchangeHandler = () => {
    const index = params.findIndex((el: any) => el.id === id);
    params[index] = { id, type };

    setParameters({
      ...parameters,
      configFields: params,
    });
  };

  return (
    <Radio
      id={`radio-${id}-${type}`}
      name={`radio-${id}-${type}`}
      value={"test"}
      isChecked={isChecked}
      onChange={onchangeHandler}
    >
      <Text style={{ textTransform: "capitalize" }}>{type}</Text>
    </Radio>
  );
};

export default ContentFieldRadio;
