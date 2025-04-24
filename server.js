// server.js - Express server to handle API requests
import express from 'express';
import { OpenAI } from 'openai';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI SDK with API key
// Log all available environment variables (without values) to help debug
console.log('Available environment variables:', Object.keys(process.env));

// Try to find the API key from various possible environment variable names
const apiKey = process.env.OPENAI_API_KEY || 
             process.env.VITE_OPENAI_API_KEY || 
             process.env.VERCEL_OPENAI_API_KEY || 
             process.env.DEEPSEEK_API_KEY;

console.log('API key found:', !!apiKey);
if (apiKey) {
  console.log('API key starts with:', apiKey.substring(0, 3) + '...');
} else {
  console.error('WARNING: No API key found in environment variables');
}

// Initialize the OpenAI client
const openai = new OpenAI({ 
  apiKey: apiKey,
});

console.log('OpenAI client initialized successfully');

// Helper function to format targets for prompt
const formatTargets = (targets) => {
  if (!targets || targets.length === 0) return 'Not specified';
  if (targets.length === 1) return targets[0];
  if (targets.length === 2) return `${targets[0]} and ${targets[1]}`;
  
  const lastTarget = targets[targets.length - 1];
  const otherTargets = targets.slice(0, -1).join(', ');
  return `${otherTargets}, and ${lastTarget}`;
};

// Rewrite API endpoint - support both /rewrite and /api/rewrite paths
app.post(['/rewrite', '/api/rewrite'], async (req, res) => {
  const { rant } = req.body;

  if (!rant) {
    return res.status(400).json({ error: 'Rant content is required' });
  }

  try {
    const prompt = `
    You're a passionate Reds fan who also happens to write really good, thoughtful emails. 
    Take this raw rant and turn it into a well-crafted but emotionally honest letter 
    to the owner of the Cincinnati Reds. Keep the tone respectful but firm.
    
    IMPORTANT: Structure your response in EXACTLY these three parts and keep it concise:
    1. Intro (2-3 sentences introducing yourself and your main concern)
    2. Body (3-4 sentences explaining your specific complaint with evidence)
    3. Closing (1-2 sentences with a call to action)
    
    Rant:
    ${rant}
    
    Email:
    `;

    console.log('Attempting to call OpenAI API for rewrite');
    console.log('API Key available:', !!process.env.OPENAI_API_KEY);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',  // Using a specific OpenAI model that's definitely available
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });
    
    console.log('Received successful response from OpenAI API');
    
    if (!completion.choices || completion.choices.length === 0) {
      console.error('OpenAI API returned no choices');
      throw new Error('API returned no content choices');
    }
    
    const emailContent = completion.choices[0].message.content;
    console.log('Generated email:', emailContent ? (emailContent.substring(0, 100) + '...') : 'Empty response');
    
    if (!emailContent) {
      console.error('OpenAI API returned empty content');
      throw new Error('API returned empty content');
    }
    
    res.status(200).json({ email: emailContent });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Handle API key errors specially
    if (error.message && error.message.includes('API key')) {
      console.error('API KEY ERROR: This appears to be an authentication issue with OpenAI');
      return res.status(500).json({ 
        error: `OpenAI API key error: ${error.message}`,
        apiKeyError: true
      });
    }
    
    res.status(500).json({ error: `Failed to process rant: ${error.message}` });
  }
});

// Send email API endpoint - support both /send and /api/send paths
app.post(['/send', '/api/send'], async (req, res) => {
  const { emailText, senderName, senderEmail } = req.body;

  if (!emailText || !senderName || !senderEmail) {
    return res.status(400).json({ error: 'Email text, sender name, and sender email are required' });
  }

  try {
    // Log the email sending attempt
    console.log('Attempting to send email to pcastellini@reds.com');
    
    // Initialize email transport - we're using a service-based approach
    // This will use the SMTP settings from your environment variables
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'Gmail', // Can be 'Gmail', 'Outlook', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    // Configure the email options
    const mailOptions = {
      from: `"Reds Fan Feedback" <${process.env.EMAIL_USER}>`, // More anonymous sender name
      to: 'pcastellini@reds.com', // Send directly to Phil Castellini
      subject: 'Feedback from a Passionate Reds Fan',
      text: emailText,
      // Only include reply-to if user is not anonymous
      ...(senderEmail && senderName && { replyTo: senderEmail })
    };

    // Check if email environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials in environment variables');
      return res.status(500).json({ 
        error: 'Email service not properly configured. Contact administrator.',
        details: 'Missing email credentials'
      });
    }
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
});

// Handle structured form submissions
app.post(['/rewrite-structured', '/api/rewrite-structured'], async (req, res) => {
  console.log('Received structured form request:', req.body);
  const { formData } = req.body;

  if (!formData || !formData.mainComplaint) {
    console.error('Missing required field: mainComplaint');
    return res.status(400).json({ error: 'Main complaint is required' });
  }
  
  console.log('Processing structured form with main complaint:', formData.mainComplaint);

  try {
    const formattedTargets = formatTargets(formData.complaintTarget);
    
    const prompt = `
    You're a passionate Cincinnati Reds fan who wants to write a respectful but firm letter 
    to the ownership/management of the team. Create a professional email from the following structured input:
    
    Main Complaint: ${formData.mainComplaint}
    Offensive Complaint: ${formData.offensiveComplaint || 'Not provided'}
    Defensive Complaint: ${formData.defensiveComplaint || 'Not provided'}
    Why Frustration Occurred: ${formData.frustrationReason || 'Not provided'}
    Directed Towards: ${formattedTargets}
    ${formData.signature ? `Signature: ${formData.signature}` : ''}
    Anonymous: ${formData.anonymous ? 'Yes' : 'No'}
    
    IMPORTANT: Structure your response in EXACTLY these three parts and keep it concise:
    1. Intro (2-3 sentences introducing yourself and your main concern)
    2. Body (3-4 sentences explaining your specific complaint with evidence)
    3. Closing (1-2 sentences with a call to action)
    
    Additional Instructions:
    - Maintain a respectful but firm tone
    - Focus primarily on the main complaint
    - If the user provided a signature and isn't anonymous, include it at the end
    - If the user chose to remain anonymous, don't include identifying information
    - Keep the total email to around 150-200 words maximum
    `;    

    console.log('Sending prompt to OpenAI API');
    console.log('API Key available:', !!process.env.OPENAI_API_KEY);
    
    try {
      console.log('Attempting to call OpenAI with model: gpt-3.5-turbo-1106');
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',  // Using a specific OpenAI model that's definitely available
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });
      
      console.log('Received successful response from OpenAI API');
      
      if (!completion.choices || completion.choices.length === 0) {
        console.error('OpenAI API returned no choices');
        throw new Error('API returned no content choices');
      }
      
      const emailContent = completion.choices[0].message.content;
      console.log('Generated email:', emailContent ? (emailContent.substring(0, 100) + '...') : 'Empty response');
      
      if (!emailContent) {
        console.error('OpenAI API returned empty content');
        throw new Error('API returned empty content');
      }
      
      res.status(200).json({ email: emailContent });
    } catch (apiError) {
      console.error('OpenAI API error:', apiError);
      
      // Handle API key errors specially
      if (apiError.message && apiError.message.includes('API key')) {
        console.error('API KEY ERROR: This appears to be an authentication issue with OpenAI');
        return res.status(500).json({ 
          error: `OpenAI API key error: ${apiError.message}`,
          apiKeyError: true
        });
      }
      
      throw apiError;
    }
  } catch (error) {
    console.error('Error processing structured form:', error);
    res.status(500).json({ error: `Failed to process structured form: ${error.message}` });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
