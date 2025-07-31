"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is AI Interviewer Mocker?",
    answer:
      "It's a tool that helps you practice interviews using AI-generated questions and instant feedback.",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes! You can use basic features for free. Advanced features are available with the Pro plan.",
  },
  {
    question: "Can I practice for specific job roles?",
    answer:
      "Absolutely. You can select roles like Frontend Developer, Data Analyst, etc., and get tailored questions.",
  },
  {
    question: "How does the AI evaluate my answers?",
    answer:
      "We use language models to analyze your answers and provide helpful insights and improvement tips.",
  },
  {
    question: "Can I export my interview sessions?",
    answer:
      "Yes, Pro users can export their sessions and feedback in PDF format.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
