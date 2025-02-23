import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content:
            "You generate authentic student-athlete testimonials. Focus on specific experiences with the athletic program, team dynamics, coaching staff, and academic support. Include details about training, competition, and personal growth. Each response should flow naturally and end with a complete, meaningful concluding sentence. Always end with a period. Keep the tone thoughtful, realistic and casual.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
      stop: ["\n\n"], // Prevent multiple paragraphs at the end
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({
      error: "Failed to generate summary",
      details: error.message,
    });
  }
}
