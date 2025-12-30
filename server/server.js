import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import OpenAI from "openai";


const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.use(express.json({ limit: "10mb" }));
//security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",

})

app.use(limiter);




app.post("/api/explainCode", async (req, res) => {

    try {
        const { code, language, question } = req.body;

        if (!code || !language) {
            return res.status(400).json({ error: "Code and language are required" });
        }

        const messages = [
            {
                role: "system",
                content: `You are an expert code explainer. For any code provided, create a comprehensive explanation that includes:

## Explanation
- What the code does and its purpose
- Key concepts and patterns used
- How different parts work together

## Components/Functions
- Breakdown of main functions, classes, or components
- Parameters and return values
- Important details about each part

## Usage Examples
- Practical examples showing how to use the code
- Different use cases or scenarios
- Expected inputs and outputs

## Notes
- Best practices or important considerations
- Potential gotchas or common mistakes
- Related concepts or further reading

Format your response using markdown. Use headings (##, ###) for sections, code blocks for examples, and clear, concise explanations.`

            },
            {
                role: "user",
                content: `Explain this code and provide usage examples:\n\nCode:\n${code}\n\nLanguage: ${language}${question ? `\n\nSpecific question: ${question}` : ''}`
            }
        ];

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages
        });

        const explanation = response?.choices[0]?.message?.content;

        if (!explanation) {
            return res.status(400).json({ error: "Failed to generate explanation" });
        }

        return res.status(200).json({ response: explanation });



    } catch (error) {
        console.error("Error explaining code:", error);
        return res.status(500).json({ error: "Failed to explain code" });
    }

})


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});