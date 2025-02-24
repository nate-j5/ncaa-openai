import React from "react";
import Image from "next/image";

const SchoolSelector = ({
  schools,
  selectedSchool,
  setSelectedSchool,
  selectedSport,
  setSelectedSport,
  isLoading,
  handleSampleClick,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex justify-center mb-6">
        <Image
          src={selectedSchool ? selectedSchool.image : "/assets/ncaa.png"}
          alt={selectedSchool ? selectedSchool.name : "NCAA logo"}
          width={80}
          height={80}
          unoptimized 
        />
      </div>

      <h1 className="text-3xl font-light text-center text-black mb-8">
        Select School
      </h1>
      <p className="text-center text-gray-700 text-lg font-light mb-6">
        Evaluating college programs for student-athletes
      </p>

      <div className="space-y-3 max-w-md mx-auto mb-6">
        <select
          id="school-select"
          value={selectedSchool?.name || ""}
          onChange={(e) => {
            const school = schools.find((s) => s.name === e.target.value);
            setSelectedSchool(school);
            setSelectedSport(null);
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

        {selectedSchool && (
          <select
            id="sport-select"
            value={selectedSport || ""}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full rounded-md border border-gray-600 p-3 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Choose a sport</option>
            {[
              "Men's Basketball",
              "Women's Basketball",
              "Women's Volleyball",
            ].map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSampleClick}
          disabled={!selectedSchool || !selectedSport || isLoading}
          className="w-3/4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating testimonial..." : "Evaluate Program"}
        </button>
      </div>
    </div>
  );
};

export default SchoolSelector;
