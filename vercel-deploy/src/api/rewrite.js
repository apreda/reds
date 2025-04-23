import { OpenAI } from 'openai';

// Rewrite API endpoint
export default async function handler(req, res) {
  const { rant } = req.body;

  if (!rant) {
    return res.status(400).json({ error: 'Rant content is required' });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const prompt = `
    You're a passionate Reds fan who also happens to write really good, thoughtful emails. 
    Take this raw rant and turn it into a well-crafted but emotionally honest letter 
    to the owner of the Cincinnati Reds. Keep the tone respectful but firm.
    
    Rant:
    ${rant}
    
    Email:
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    });

    res.status(200).json({ email: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to process rant' });
  }
}
