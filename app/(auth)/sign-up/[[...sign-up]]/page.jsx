"use client";

import { SignUp } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up - AI Interviewer Mocker</title>
        <meta name="description" content="Create your account to start AI-driven mock interviews." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
        {/* Optional Background Blur or Illustration */}
        <div className="absolute inset-0 z-0">
          <img
            src="/AI_V.webp"
            alt="Background"
            className="w-full h-full object-fit opacity-20 blur-sm"
          />
        </div>

        {/* Sign-Up Card */}
        
          
          <SignUp appearance={{ elements: { card: "shadow-none" } }} />
          
        </div>
      
    </>
  );
}
