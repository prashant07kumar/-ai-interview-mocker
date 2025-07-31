import React from "react";

const PricingCard = () => {
  return (
    <div className="mt-10 bg-white flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-2">Upgrade</h2>
      <p className="text-gray-600 mb-8">
        Upgrade to monthly plan to access unlimited mock interview
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Free Plan */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition-all">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-3xl font-bold mb-4">0$<span className="text-sm font-medium">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>✅ Create 3 Free Mock Interview</li>
            <li>✅ Unlimited Retake Interview</li>
            <li>❌ Practice Question</li>
            
            <li>❌ Email Support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition-all">
          <h3 className="text-2xl font-bold mb-2">Monthly</h3>
          <p className="text-3xl font-bold mb-4">7.99$<span className="text-sm font-medium">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>✅ Create 3 Free Mock Interview</li>
            <li>✅ Unlimited Retake Interview</li>
            <li>✅ Practice Question</li>
            
            <li>✅ Email Support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
