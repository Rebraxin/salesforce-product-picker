import { FormControl, Stack, TextInput } from "@contentful/f36-components";
import React from "react";
import { css } from "emotion";

const ConfigField = (props: any) => {
  const { field, parameters, value, onChange } = props;
  return (
    <Stack
      fullWidth
      flexDirection='column'
      alignItems='flex-start'
      spacing='none'
      marginBottom='spacingL'
    >
      <FormControl.Label>{field.label}</FormControl.Label>
      <TextInput
        placeholder={field.placeholder}
        value={value !== "" ? value : ""}
        onChange={onChange}
      />
      <Stack
        fullWidth
        justifyContent='space-between'
        className={css({ padding: "0 10px" })}
      >
        <FormControl.HelpText>{field.helper}</FormControl.HelpText>
        <FormControl.HelpText>
          {parameters?.host?.length ?? 0}
          /255
        </FormControl.HelpText>
      </Stack>
    </Stack>
  );
};

export default ConfigField;
