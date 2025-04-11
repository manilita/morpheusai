require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/generate", async (req, res) => {
  try {
    const { userText } = req.body;
    console.log("Received request:", userText);

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      { inputs: `Analyze this dream: ${userText}` },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Optional API Key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hugging Face Response:", response.data);
    res.json({ response: response.data[0].generated_text });

  } catch (error) {
    console.error("Hugging Face API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
