export const getQuery = (type: string, sdk: any, ids?: string[] | number[]) => {
  // Config Parameters
  const { clientId, siteId, host } = sdk.parameters.installation;

  const baseURL = `https://${host}/s/${siteId}/dw/shop/v21_9`;
  const clientIdParam = `client_id=${clientId}`;

  switch (type) {
    case "products":
      return `${baseURL}/products/(${ids?.join(
        ","
      )})?${clientIdParam}&expand=images&count=24&start=0`;

    case "categories":
      return `${baseURL}/categories/root?${clientIdParam}&levels=1`;

    default:
      return "";
  }
};
