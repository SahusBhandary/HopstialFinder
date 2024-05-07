import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// const configuration = new Configuration ({
//     oragnization: "org-luARjjyTeb5FLVVoL8Ok8PRy",
//     apiKey: "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",
// });

const openai = new OpenAI({
    organization: "org-luARjjyTeb5FLVVoL8Ok8PRy",
    apiKey: "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",
});

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { message } = req.body;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "user", content: `${message}`,},
        ]
    })

    res.json({
        completion: completion.choices[0].message
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});