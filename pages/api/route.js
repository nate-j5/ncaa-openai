import OpenAI from "openai";

export const config = {
  runtime: "edge", 
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { prompt } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
      max_tokens: 200, 
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
      stop: ["\n\n"],
    });

    const responseText = completion?.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate summary", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
