import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const AthleteDetails = ({
  selectedAthlete,
  selectedSchool,
  handleBackClick,
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm font-light">Back to Schools</span>
        </button>
        <div className="text-gray-400 text-sm font-light">
          {selectedAthlete.sport}
        </div>
      </div>

      <div className="flex flex-col items-center mb-3">
        <Image
          src={selectedSchool?.image || "/assets/ncaa.png"}
          alt={selectedSchool?.name || "School Logo"}
          width={80}
          height={80}
        />
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedAthlete.name}
          </h2>
          <div className="text-sm mt-1.5 text-gray-500">
            {selectedAthlete.hometown} - Class of{" "}
            {selectedAthlete.graduationYear}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-8 relative">
        <div className="mt-2">
          <div className="mt-4 ml-6">
            <div className="flex justify-between gap-6 mt-2">
              <div className="w-1/2">
                <h5 className="font-semibold text-gray-700">Pros</h5>
                <ul className="list-disc pl-6">
                  {selectedSchool.pros.map((pro, index) => (
                    <li key={index} className="text-gray-600">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <h5 className="font-semibold text-gray-700">Cons</h5>
                <ul className="list-disc pl-6">
                  {selectedSchool.cons.map((con, index) => (
                    <li key={index} className="text-gray-600">
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-md leading-relaxed pl-4 mt-6">
              {selectedAthlete.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDetails;
