// src/utils/saveEmail.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    try {
      // Insert the email into the database
      await sql`INSERT INTO emails (address) VALUES (${email})`;
      return res.status(200).json({ message: 'Email saved successfully!' });
    } catch (error) {
      console.error("Error saving email:", error);
      return res.status(500).json({ error: 'Failed to save email.' });
    }
  } else {
    // Only POST requests are allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
