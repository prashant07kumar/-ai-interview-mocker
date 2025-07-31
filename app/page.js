"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const TypingText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.p
      className="text-gray-600 text-lg md:text-xl min-h-[3rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {displayedText}
    </motion.p>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-white via-blue-50 to-sky-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-[30rem] h-[30rem] bg-green-300 opacity-20 rounded-full blur-[160px] top-[-10%] left-[-10%] z-0" />
      <div className="absolute w-[25rem] h-[25rem] bg-blue-300 opacity-20 rounded-full blur-[160px] bottom-[-10%] right-[-10%] z-0" />

      <motion.div
        className="max-w-4xl text-center space-y-6 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Ace Your Next Interview with{" "}
          <span className="text-green-600">AI Interview Mocker</span>
        </h1>

        <TypingText text="Prepare smarter, not harder. Practice with realistic AI-driven mock interviews and get instant feedback." />

        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/dashboard">
            <Button size="lg" className="text-white bg-green-600 hover:bg-green-700">
              Start Interview
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Image
            src="/AI_V.webp"
            alt="AI Interview Illustration"
            width={600}
            height={400}
            className="mx-auto drop-shadow-xl rounded-xl"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
