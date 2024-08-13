export default {
  twitterRequestToken: 'https://api.twitter.com/oauth/request_token',
  twitterAccessToken: ({ oauth_token, oauth_verifier }) =>
    `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
  ola_query_location: 'https://api.olamaps.io/places/v1/autocomplete',
  ola_get_address: `https://api.olamaps.io/places/v1/reverse-geocode`,
};
