import React, { useCallback, useState, useEffect, Fragment } from "react";
import { AppExtensionSDK } from "@contentful/app-sdk";
import {
  Heading,
  Form,
  Flex,
  Stack,
  Box,
  MenuDivider,
  Text,
} from "@contentful/f36-components";
import { css } from "emotion";
import { useCMA, useSDK } from "@contentful/react-apps-toolkit";
import { configFields } from "../data/config-fields";
import ConfigField from "../components/config-screen/ConfigField";
import ConfigHeaderImg from "../components/config-screen/ConfigHeaderImg";
import FieldCheckbox from "../components/config-screen/FieldCheckbox";

export interface AppInstallationParameters {
  host: string;
  clientId: string;
  siteId: string;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<any>({});

  const sdk = useSDK<any>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  const cma = useCMA();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters: parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const [spaceEntries, setSpaceEntries] = useState<any>(null);

  useEffect(() => {
    const entries = async () => {
      try {
        const response = await cma.contentType.getMany({});

        return setSpaceEntries(response as any);
      } catch (error) {
        console.log("error >>> ", error);
      }
    };

    entries();
  }, [cma]);

  return (
    <Flex
      flexDirection="column"
      className={css({
        position: "relative",
      })}
    >
      <Box
        className={css({
          position: "absolute",
          zIndex: -1,
          height: "250px",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#0198D7",
        })}
      />
      <Stack
        className={css({
          backgroundColor: "white",
          maxWidth: "800px",
          width: "100%",
          margin: "100px auto",
          padding: "40px",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.25)",
          borderRadius: "5px",
          flexDirection: "column",
        })}
      >
        <ConfigHeaderImg />
        <Form
          className={css({
            width: "100%",
          })}
        >
          <Stack spacing="none" flexDirection="column" alignItems="flex-start">
            <Heading>Configuration</Heading>
            <ConfigField
              field={configFields[0]}
              parameters={parameters}
              value={parameters.host ?? ""}
              onChange={(e: any) =>
                setParameters({
                  ...parameters,
                  host: e.target.value,
                })
              }
            />
            <ConfigField
              field={configFields[1]}
              parameters={parameters}
              value={parameters.clientId ?? ""}
              onChange={(e: any) =>
                setParameters({
                  ...parameters,
                  clientId: e.target.value,
                })
              }
            />
            <ConfigField
              field={configFields[2]}
              parameters={parameters}
              value={parameters.siteId ?? ""}
              onChange={(e: any) =>
                setParameters({
                  ...parameters,
                  siteId: e.target.value,
                })
              }
            />
          </Stack>
          <MenuDivider />
          <Heading marginTop="spacingL">Assign to fields</Heading>
          <Text>
            This app can only be used with <b>Short text</b> or{" "}
            <b>Short text, list</b> fields. Select which fields you’d like to
            enable for this app.
          </Text>
          <Box marginTop="spacingL">
            {spaceEntries?.items.map((entry: any, index: number) => {
              return (
                <Fragment key={index}>
                  <Heading
                    style={{ textTransform: "capitalize", fontSize: "16px" }}
                  >
                    {entry.name}
                  </Heading>
                  {entry?.fields.map((field: any) => (
                    <Fragment key={field.id}>
                      <FieldCheckbox
                        {...field}
                        parameters={parameters}
                        setParameters={setParameters}
                      />
                    </Fragment>
                  ))}
                </Fragment>
              );
            })}
          </Box>
        </Form>
      </Stack>
    </Flex>
  );
};

export default ConfigScreen;
