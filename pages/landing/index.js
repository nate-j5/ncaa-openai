import React, { useState } from "react";
import Image from "next/image";
import SchoolDetails from "../../components/SchoolDetails";

const schools = [
  {
    name: "University of Iowa",
    location: "Iowa City, Iowa",
    image: "/assets/iowa.png",
  },
  {
    name: "Stanford University",
    location: "Stanford, California",
    image: "/assets/stanford.png",
  },
  {
    name: "University of Texas at Austin",
    location: "Austin, Texas",
    image: "/assets/texas.png",
  },
  {
    name: "University of West Florida",
    location: "Pensacola, Florida",
    image: "/assets/west-florida.png",
  },
];

const SchoolInfo = ({ school, onShowDetails, strategy, setStrategy }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform">
    <h2 className="text-3xl font-extrabold text-center text-white mb-6">
      {school.name}
    </h2>
    <div className="flex justify-center mb-6">
      <Image
        src={school.image}
        alt={school.name}
        width={224}
        height={224}
        className="rounded-xl shadow-md object-cover"
      />
    </div>
    <p className="text-center text-gray-300 mb-6">{school.location}</p>

    <div className="flex justify-center gap-8 mb-6">
      <label className="flex items-center gap-2 text-gray-300">
        <input
          type="radio"
          value="offensive"
          checked={strategy === "offensive"}
          onChange={(e) => setStrategy(e.target.value)}
          className="accent-green-500"
        />
        Offensive Strategy
      </label>
      <label className="flex items-center gap-2 text-gray-300">
        <input
          type="radio"
          value="defensive"
          checked={strategy === "defensive"}
          onChange={(e) => setStrategy(e.target.value)}
          className="accent-green-500"
        />
        Defensive Strategy
      </label>
    </div>

    <button
      onClick={onShowDetails}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-colors"
    >
      Evaluate Program
    </button>
  </div>
);

export default function Home() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [strategy, setStrategy] = useState("offensive");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-10 flex items-center justify-center">
      <div className="max-w-6xl w-full space-y-10">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full md:w-1/2 mx-auto">
          <div className="flex justify-center gap-8 mb-8">
            <Image
              src="/assets/ncaa.png"
              alt="NCAA Logo"
              width={112}
              height={112}
              className="object-contain"
            />
            <Image
              src="/assets/logo.png"
              alt="School Logo"
              width={112}
              height={112}
              className="object-contain"
            />
          </div>

          <div className="max-w-md mx-auto">
            <label
              htmlFor="school-select"
              className="text-xl font-semibold text-white block mb-3"
            >
              Select a School:
            </label>
            <select
              id="school-select"
              value={selectedSchool?.name || ""}
              onChange={(e) => {
                const school = schools.find((s) => s.name === e.target.value);
                setSelectedSchool(school);
                setShowDetails(false);
              }}
              className="w-full rounded-md border border-gray-600 p-3 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="">Choose a school</option>
              {schools.map((school) => (
                <option key={school.name} value={school.name}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedSchool && (
          <div className="grid lg:grid-cols-2 gap-10">
            <SchoolInfo
              school={selectedSchool}
              onShowDetails={() => setShowDetails(true)}
              strategy={strategy}
              setStrategy={setStrategy}
            />
            {showDetails && (
              <SchoolDetails school={selectedSchool} strategy={strategy} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
