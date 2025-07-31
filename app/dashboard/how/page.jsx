"use client";

import { FaUserCheck, FaRobot, FaComments, FaChartLine } from "react-icons/fa";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "1. Create Your Account",
      description:
        "Sign up using your email or social account to access the AI Interviewer Mocker platform.",
      icon: <FaUserCheck className="text-blue-600 text-3xl" />,
    },
    {
      title: "2. Select Your Interview Type",
      description:
        "Choose a role or topic (e.g., Frontend Developer, Data Analyst) and get tailored questions.",
      icon: <FaRobot className="text-green-600 text-3xl" />,
    },
    {
      title: "3. Start Mock Interview",
      description:
        "AI asks you questions in real-time. Answer using text or voice and get immediate feedback.",
      icon: <FaComments className="text-purple-600 text-3xl" />,
    },
    {
      title: "4. Review & Improve",
      description:
        "Check your scores, suggestions, and past sessions to continuously improve your skills.",
      icon: <FaChartLine className="text-orange-500 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">How It Works?</h1>
        <p className="text-lg text-gray-600 mb-12">
          Learn how to get the most out of AI Interviewer Mocker in just a few simple steps.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
