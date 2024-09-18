# Purrfect Health

Purrfect Health is a serverless web application that helps cat owners identify potential health issues in their feline companions through image analysis.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Features](#features)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

## Project Overview

Purrfect Health allows users to upload images of their cats for disease detection. The application uses advanced image recognition technology to analyze the uploaded images and provide insights into potential health concerns.

## Architecture

This project uses a completely serverless architecture leveraging various AWS services. Here's an overview of the key components:

![image](https://github.com/user-attachments/assets/a08f2ba1-8ef9-4b21-92de-b6c212657fb4)


1. **Frontend**: React-based web application hosted on AWS EC2
2. **Authentication**: User signup and login managed through AWS Cognito
3. **API Gateway**: Handles incoming requests and routes them to appropriate Lambda functions
4. **Lambda Functions**: Serverless compute for various functionalities:
   - Image processing
   - Disease detection
   - User data management
   - Subscription updates
5. **S3 Bucket**: Stores uploaded cat images
6. **Amazon Rekognition**: Performs image analysis for disease detection
7. **DynamoDB**: Stores user data and prediction history
8. **SNS**: Manages email subscriptions and notifications

## Getting Started

### Prerequisites

- Node.js and npm installed
- AWS account with necessary permissions
- AWS CLI configured with your credentials

### Installation

1. Clone the repository:
   ```
   git clone [repo-url]
   cd purrfect-health
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure AWS services:
   - Set up Cognito User Pool
   - Create necessary Lambda functions
   - Configure API Gateway
   - Set up S3 bucket
   - Configure DynamoDB tables
   - Set up SNS topics

4. Update configuration:
   - Rename `config.example.js` to `config.js`
   - Fill in your AWS resource identifiers and API endpoints

## Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Features

- User authentication and account management
- Cat image upload and storage
- Automated disease detection using image recognition
- User-friendly interface for viewing results
- Email notifications for important updates

## Deployment

1. Build the React application:
   ```
   npm run build
   ```

2. Deploy the built files to your EC2 instance or preferred hosting service.

3. Ensure all AWS services are properly configured and permissions are set.

## Contributing

We welcome contributions to Purrfect Health! Please read our contributing guidelines before submitting pull requests.

## License

[Insert your chosen license here]

## Acknowledgements

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- AWS for providing the serverless infrastructure

