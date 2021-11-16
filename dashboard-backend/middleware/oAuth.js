var axios = require("axios");

const tokenEndpoint = "https://ambient-coder.us.auth0.com/oauth/token";

 oAuth = (req, res, next) => {
  var code = req.query.code;

  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "your-client-id");
  params.append("client_secret", "your-client-secret")
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/challenges");

  axios.post(tokenEndpoint, params)
  .then(response => {
    req.oauth = response.data;
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;