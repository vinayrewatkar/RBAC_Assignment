"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const steps = [
  {
    title: "Navigate to Roles",
    description: "Go to the Roles page and create roles with specific permissions.",
    icon: "🎯"
  },
  {
    title: "Assign Permissions",
    description: "Assign appropriate permissions to the roles you created.",
    icon: "🔒"
  },
  {
    title: "Manage Users",
    description: "Go to the Users page to create and assign roles to new users.",
    icon: "👥"
  },
  {
    title: "Update and Delete",
    description: "Update user details or delete users from the dashboard.",
    icon: "⚙️"
  },
];

const UserGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-gray-950 shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-center flex-col mb-4">
          <h2 className="text-lg font-semibold text-white text-center">
            User Management Guide
          </h2>
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation and Content */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Step Content */}
          <div className="flex-1 flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{steps[currentStep].icon}</span>
              <div>
                <h3 className="font-medium text-white">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-gray-300">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentStep ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;