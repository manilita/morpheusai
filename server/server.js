import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "@gradio/client";

dotenv.config();
const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const client = await Client.connect("victoriaaguz/dream-story-generator");

    const result = await client.predict("/predict", { prompt });

    if (result?.data && result.data.length > 0) {
      res.json({ story: result.data[0] });
    } else {
      res.json({ story: "Error: No story returned from Hugging Face." });
    }
  } catch (error) {
    console.error("Error calling HF API:", error.message);
    res.status(500).json({ story: "Server error calling Hugging Face." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
