export const parseTokenResponse = (body: string) => {
  const keyValuePairs = body.split('&');
  const parsedData = {};
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    parsedData[key] = decodeURIComponent(value);
  });
  return parsedData;
};

export interface accessTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
}

export interface requestTokenResponse {
  oauth_callback_confirmed: string;
  oauth_token: string;
  oauth_token_secret: string;
}
