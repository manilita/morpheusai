require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      methods: ["POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  

app.post("/generate", async (req, res) => {
  try {
    const { userText } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Analyze this dream: ${userText}` }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
