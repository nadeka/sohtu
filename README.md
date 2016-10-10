# sohtu [![Build Status](https://travis-ci.org/nadeka/sohtu.svg?branch=develop)](https://travis-ci.org/nadeka/sohtu) [![Coverage Status](https://coveralls.io/repos/github/nadeka/sohtu/badge.svg?branch=develop)](https://coveralls.io/github/nadeka/sohtu?branch=develop)

[Link to S3](http://ext-dev-marketing-automation.s3-website-eu-west-1.amazonaws.com/)

### Setup for development

##### 1. Install Node v6.0.0 (if you don't already have it)

You can easily manage Node versions with n:

    npm install -g n

To use 6.0.0:

    n 6.0.0

##### 2. Install dependencies

    npm install

##### 3. Start the local server

    npm start

Now the app is running on [http://localhost:3000](http://localhost:3000)

### Running tests

    npm run test
    
### Deploying to S3 manually

    npm run build
    aws s3 cp dist/ s3://<bucket_name> --recursive
