export default async function handler(req, res) {
  try {
    const data = require("../../public/data/schools.json");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching school data:", error);
    res.status(500).json({ error: "Failed to load schools data." });
  }
}
