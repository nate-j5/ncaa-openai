import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "public/data/schools.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching school data:", error);
    res.status(500).json({ error: "Failed to load schools data." });
  }
}
