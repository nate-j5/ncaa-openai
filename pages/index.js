"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import SchoolSelector from "../components/SchoolSelector";
import AthleteDetails from "../components/AthleteDetails";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [schools, setSchools] = useState([]);

  // Fetch schools data from API route
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/schools");
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        setError("Failed to load school data.");
        console.error("Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, []);

  const generatePrompt = (athlete, sentimentLevel) => {
    const basePrompt = `Generate a student-athlete testimonial for ${athlete.name}, a ${athlete.sport} player at ${selectedSchool.name} from ${athlete.hometown}, graduating in ${athlete.graduationYear}.`;

    switch (sentimentLevel) {
      case "less-favorable":
        return `${basePrompt} While maintaining professionalism, include some mild challenges or areas for improvement in the program while still highlighting some positive aspects. Keep the response in first person, as if the athlete is speaking. Produce 3-4 sentences.`;
      case "balanced":
        return `${basePrompt} Provide a balanced perspective discussing both the strengths and opportunities in the program. Keep the response in first person, as if the athlete is speaking. Produce 3-4 sentences.`;
      case "favorable":
        return `${basePrompt} Focus on the program's strengths and positive experiences, highlighting exceptional aspects of the athletic program. Keep the response in first person, as if the athlete is speaking. Produce 3-4 sentences. `;
      default:
        return basePrompt;
    }
  };

  const handleSampleClick = async () => {
    if (!selectedSport || !selectedSchool) return;
    setIsLoading(true);
    setError("");

    try {
      const athlete = selectedSchool.athletes.find(
        (athlete) => athlete.sport === selectedSport
      );

      // Generate random number between 1-10
      const randomNum = Math.floor(Math.random() * 10) + 1;

      // Determine sentiment level based on random number
      let sentimentLevel;
      if (randomNum <= 3) sentimentLevel = "less-favorable";
      else if (randomNum <= 6) sentimentLevel = "balanced";
      else sentimentLevel = "favorable";

      const prompt = generatePrompt(athlete, sentimentLevel);

      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          athlete: athlete.name,
          school: selectedSchool.name,
          sport: selectedSport,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setSelectedAthlete({
        ...athlete,
        summary: data.result,
      });
      setShowDetails(true);
    } catch (err) {
      setError("Failed to generate athlete summary. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>NCAA x OpenAI</title>
        <meta
          name="description"
          content="NCAA program evaluations using ChatGPT"
        />
      </Head>

      <div className="w-full max-w-3xl mx-auto px-4">
        <div
          className={`rounded-xl ${
            !showDetails ? "shadow-lg" : ""
          } p-8 bg-white`}
        >
          {!showDetails ? (
            <SchoolSelector
              schools={schools}
              selectedSchool={selectedSchool}
              setSelectedSchool={setSelectedSchool}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              isLoading={isLoading}
              handleSampleClick={handleSampleClick}
            />
          ) : (
            <AthleteDetails
              selectedAthlete={selectedAthlete}
              selectedSchool={selectedSchool}
              handleBackClick={() => setShowDetails(false)}
            />
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
        <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 text-center text-xs text-gray-500">
          <a
            className="text-gray-500 text-xs hover:text-gray-400 transition"
            href="https://github.com/nate-j5/ncaa-openai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Code"
          >
            View Code ↗
          </a>
        </div>
      </div>
    </>
  );
}
