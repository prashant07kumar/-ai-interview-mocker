"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Learn More About AI Interviewer Mocker
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Empower your interview preparation with intelligent, real-time mock sessions designed to help you perform at your best.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-green-100 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Driven Questions</h3>
          <p className="text-gray-600">
            Get dynamic, role-specific questions generated using state-of-the-art AI models.
          </p>
        </div>

        <div className="p-6 bg-green-100 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Feedback</h3>
          <p className="text-gray-600">
            Receive performance insights and improvement tips immediately after each session.
          </p>
        </div>

        <div className="p-6 bg-green-100 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress</h3>
          <p className="text-gray-600">
            Keep a history of sessions, scores, and feedback to measure improvement over time.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          We believe everyone deserves the confidence to ace their interviews. Our mission is to make professional interview practice accessible, personalized, and smart — powered by cutting-edge AI.
        </p>
      </div>
    </div>
  );
}
