# Dear Bobbot App Deployment Guide

This guide will walk you through deploying the Dear Bobbot app to Vercel.

## Prerequisites

1. A Vercel account
2. Your Deepseek API key: `sk-a349c189331e4bb69e348db8cbc4cde6`
3. Email service credentials (for the email sending functionality)

## Deployment Steps

### 1. Clone or Download the Project

The project files are prepared in the `vercel-deploy` directory.

### 2. Set Up Environment Variables in Vercel

When deploying to Vercel, you'll need to set up the following environment variables:

- `DEEPSEEK_API_KEY`: Your Deepseek API key
- `EMAIL_HOST`: Your email service host (e.g., smtp.gmail.com)
- `EMAIL_PORT`: Your email service port (typically 587 for TLS)
- `EMAIL_USER`: Your email username/address
- `EMAIL_PASS`: Your email password or app password
- `RECIPIENT_EMAIL`: The email address of the Cincinnati Reds owner or recipient

### 3. Deploy to Vercel

You can deploy to Vercel in two ways:

#### Option 1: Using the Vercel CLI

1. Install the Vercel CLI: `npm install -g vercel`
2. Navigate to the project directory: `cd vercel-deploy`
3. Run: `vercel login` and follow the prompts to log in
4. Run: `vercel` to deploy
5. Follow the prompts to set up your project
6. When asked about environment variables, you can set them up now or later in the Vercel dashboard

#### Option 2: Using the Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "New Project"
3. Import your project from a Git repository or upload the files
4. Configure the project:
   - Framework Preset: Other
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
5. Add the environment variables mentioned above
6. Click "Deploy"

### 4. Verify Deployment

After deployment, Vercel will provide you with a URL for your app. Visit this URL to ensure everything is working correctly.

## Troubleshooting

- If you encounter CORS issues, make sure your Vercel deployment URL is properly configured in your frontend code
- If email sending fails, verify your email service credentials and settings
- If the Deepseek API integration isn't working, check that your API key is correctly set in the environment variables

## Additional Information

- The app uses the Deepseek API through the OpenAI SDK format
- The backend is built with Express.js
- The frontend is built with React and Vite
