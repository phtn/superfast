// UBP FINANCE API
interface PostRequest {
  endpoint?: string;
  request: string;
}
const baseUrl = process.env.EXPO_PUBLIC_UBP_SB_URL;
const clientId = process.env.EXPO_PUBLIC_UBP_CLIENT_ID;
// const secret = process.env.UBP_SECRET;
const partnerId = process.env.EXPO_PUBLIC_UBP_PARTNER_ID;

export const POST = async ({ endpoint, request }: PostRequest) => {
  switch (request) {
    case "ACCESS_TOKEN":
      return await getAccessToken();
    default:
      return null;
  }
};

// Call the function to make the POST request
const getAccessToken = async () => {
  const endpoint = "partners/v1/oauth2/authorize";
  const params = new URLSearchParams();
  params.append("client_id", clientId as string);
  params.append("response_type", "code");
  params.append("scope_type", "accounts");
  params.append(
    "redirect_uri",
    "https://ubpredirect.localtunnel.me/oauth/redirect",
  );
  params.append("type", "single");
  params.append("partnerId", partnerId as string);
  const url = `${baseUrl}/${endpoint}/${params}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    // Handle the response data
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      // Handle non-2xx HTTP responses
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return JSON.stringify(data, null, 2);
  } catch (error) {
    // Handle errors
    console.error("CaughtError:", error);
  }
};
