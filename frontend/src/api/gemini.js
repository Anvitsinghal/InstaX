// src/api/gemini.js
import axios from 'axios';

const run = async (prompt) => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/user/gemini', {
      prompt,
    });
    return res.data.reply;
  } catch (err) {
    console.error('Error from Gemini backend:', err.message);
    return '⚠️ Error connecting to Gemini.';
  }
};

export default run;
