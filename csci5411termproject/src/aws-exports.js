const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_IMLS0Vity",
    "aws_user_pools_web_client_id": "3bc0j1uu3f9b01ldrh2knlgkmb",
    "oauth": {
      "domain": "https://cscitermproject.auth.us-east-1.amazoncognito.com",
      "scope": ["email", "openid", "profile"],
      "redirectSignIn": "https://localhost:3000/",
      "redirectSignOut": "https://localhost:3000/",
      "responseType": "code"
    }
  };
  
  export default awsmobile;

  // "start": "PORT=8080 && react-scripts start",
