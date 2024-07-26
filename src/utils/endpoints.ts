export default {
  twitterRequestToken: 'https://api.twitter.com/oauth/request_token',
  twitterAccessToken: ({ oauth_token, oauth_verifier }) =>
    `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
};
