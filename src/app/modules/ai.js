import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/skill-gap", async (req, res) => {
  const { userSkills, targetJob } = req.body;

  const prompt = `
    Compare the user's skills with ${targetJob} requirements.
    Return missing skills and recommendations.

    User skills: ${userSkills}
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const result = response.output[0].content[0].text;

  res.json({ result });
});
