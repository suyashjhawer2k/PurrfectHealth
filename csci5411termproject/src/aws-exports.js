const awsmobile = {
  "aws_project_region": "<your-aws-project-region>",
  "aws_cognito_region": "<your-aws-cognito-region>",
  "aws_user_pools_id": "<your-user-pool-id>",
  "aws_user_pools_web_client_id": "<your-web-client-id>",
  "oauth": {
    "domain": "<your-cognito-domain>",
    "scope": ["email", "openid", "profile"],
    "redirectSignIn": "<your-redirect-signin-url>",
    "redirectSignOut": "<your-redirect-signout-url>",
    "responseType": "code"
  }
};


export default awsmobile;

// "start": "PORT=8080 && react-scripts start",
