import React, { useCallback, useState, useEffect } from "react";
import { AppExtensionSDK } from "@contentful/app-sdk";
import {
  Heading,
  Form,
  Paragraph,
  Flex,
  TextInput,
  MenuDivider,
  Stack,
  Box,
  FormControl,
} from "@contentful/f36-components";
import { css } from "emotion";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";

export interface AppInstallationParameters {
  host: string;
  clientId: string;
  siteId: string;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    host: "",
    clientId: "",
    siteId: "",
  });

  const sdk = useSDK<AppExtensionSDK>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

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

  return (
    <Flex
      flexDirection='column'
      className={css({
        position: "relative",
      })}
    >
      <Box
        className={css({
          position: "absolute",
          zIndex: -1,
          height: "300px",
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
          margin: "150px auto 0",
          padding: "50px 0",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.25)",
          borderRadius: "5px",
          position: "relative",
        })}
      >
        <Box
          className={css({
            position: "absolute",
            bottom: "-120px",
            transform: "translateX(-50%)",
            left: "50%",
            width: "100px",
          })}
        >
          <img
            width='100%'
            height='auto'
            src='https://res.cloudinary.com/ddimmoz2o/image/upload/v1659689622/gruezi/logo/sfcc_logo_ef6nwt.png'
            alt='Salesforce CommerceCloud Logo'
          />
        </Box>
        <Form
          className={css({
            width: "100%",
          })}
        >
          <Stack
            flexDirection='column'
            alignItems='flex-start'
            className={css({
              padding: "0 30px 10px",
            })}
          >
            <Heading>About Salesforce CommerceCloud Product Picker</Heading>
            <Paragraph>
              Contentful-App to pick products from Salesforce CommerceCloud
              indices.
            </Paragraph>
          </Stack>
          <MenuDivider />
          <Stack
            flexDirection='column'
            alignItems='flex-start'
            className={css({
              padding: "10px 30px",
            })}
          >
            <Heading>Configuration</Heading>
            <Stack
              fullWidth
              flexDirection='column'
              alignItems='flex-start'
              spacing='none'
              marginBottom='spacingL'
            >
              <FormControl.Label>Host</FormControl.Label>
              <TextInput
                placeholder='Provide the host of your Application here'
                value={parameters?.host !== "" ? parameters?.host : ""}
                onChange={(e) =>
                  setParameters({
                    ...parameters,
                    host: e.target.value,
                  })
                }
              />
              <Stack
                fullWidth
                justifyContent='space-between'
                className={css({ padding: "0 10px" })}
              >
                <FormControl.HelpText>
                  ex: er7-fgh.sandbox.eu01.dx.commercecloud.salesforce.com
                </FormControl.HelpText>
                <FormControl.HelpText>
                  {parameters?.host?.length > 0 ? parameters?.host?.length : 0}
                  /255
                </FormControl.HelpText>
              </Stack>
            </Stack>
            <Stack
              fullWidth
              flexDirection='column'
              alignItems='flex-start'
              spacing='none'
              marginBottom='spacingL'
            >
              <FormControl.Label>Client ID</FormControl.Label>
              <TextInput
                placeholder='Provide the client ID of your Application here'
                value={parameters?.clientId !== "" ? parameters?.clientId : ""}
                onChange={(e) =>
                  setParameters({
                    ...parameters,
                    clientId: e.target.value,
                  })
                }
              />
              <Stack
                fullWidth
                justifyContent='space-between'
                className={css({ padding: "0 10px" })}
              >
                <FormControl.HelpText>
                  ex: 1d0953b-9a0dty-54bbb-b7c67-17c6095343
                </FormControl.HelpText>
                <FormControl.HelpText>
                  {parameters?.clientId?.length > 0
                    ? parameters?.clientId?.length
                    : 0}
                  /255
                </FormControl.HelpText>
              </Stack>
            </Stack>
            <Stack
              fullWidth
              flexDirection='column'
              alignItems='flex-start'
              spacing='none'
              marginBottom='spacingL'
            >
              <FormControl.Label>Site ID</FormControl.Label>
              <TextInput
                placeholder='Provide the side ID of your Application here'
                value={parameters?.siteId !== "" ? parameters?.siteId : ""}
                onChange={(e) =>
                  setParameters({
                    ...parameters,
                    siteId: e.target.value,
                  })
                }
              />
              <Stack
                fullWidth
                justifyContent='space-between'
                className={css({ padding: "0 10px" })}
              >
                <FormControl.HelpText>ex: RefArch</FormControl.HelpText>
                <FormControl.HelpText>
                  {parameters?.siteId?.length > 0
                    ? parameters?.siteId?.length
                    : 0}
                  /255
                </FormControl.HelpText>
              </Stack>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </Flex>
  );
};

export default ConfigScreen;
