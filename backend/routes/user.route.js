import express from "express";
import { editProfile, followOrUnfollow, getCurrentUser, getProfile, login, logout, register, suggestedUsers } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
const router=express.Router();
router.route('/me').get(isAuthenticated,getCurrentUser);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated,getProfile);
router.route('/profile/edit').post(isAuthenticated,upload.single('profilePhoto'),editProfile);
router.route('/suggested').get(isAuthenticated,suggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated,followOrUnfollow);
router.route('/gemini').post(async (req,res)=>{
    const genAI = new GoogleGenerativeAI("AIzaSyAWA5nNBKWqAxhypWpOVw05r6I807M9EmI");
     const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini.' });
  }
})

router.get("/news", async (req, res) => {
  const { q } = req.query;

  try {
    const newsRes = await axios.get(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=${"253b5afd229e442fbd17a6b2af2a8525"}`
    );
    res.json(newsRes.data);
  } catch (err) {
    console.error("News API error:", err.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});
export default router;