"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { MicIcon, StopCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAi";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";

const RecordAnswerSection = ({
  mockinterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const hasSaved = useRef(false);

  const {
    error,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const combinedText = results.map((r) => r.transcript).join(" ");
      setUserAnswer(combinedText);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10 && !hasSaved.current) {
      hasSaved.current = true;
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      hasSaved.current = false;
      setUserAnswer(""); // Clear previous answer
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("interviewData:", interviewData);
  console.log("user:", user);
    if (!interviewData?.mockId || !user?.primaryEmailAddress?.emailAddress) {
      console.error("Missing interview data or user email.");
      toast.error("Interview or user data is missing.");
      return;
    }

    try {
      setLoading(true);

      const feedbackPrompt = `
        Question: ${mockinterviewQuestion[activeQuestionIndex]?.question}
        User answer: ${userAnswer}
        Based on the question and user answer, provide a short feedback in 3 to 5 lines.
        Return JSON format like: {"rating": "X/10", "feedback": "Your feedback here"}
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawText = await result.response.text();
      const mockJsonResp = rawText.replace(/```json|```/g, "");

      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(mockJsonResp);
      } catch (e) {
        console.error("Invalid JSON from Gemini:", mockJsonResp);
        toast.error("AI feedback was not in proper JSON format.");
        setLoading(false);
        return;
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: mockinterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockinterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      console.log("Insert response:", resp);
      toast.success("Your answer has been saved successfully.");
      setUserAnswer("");
      setResults([]); // Clear results after saving
    } catch (error) {
      console.error("Error saving answer to DB:", error);
      toast.error("Failed to save your answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 mx-10 justify-center items-center bg-black rounded-lg p-5 ">
        <Image
          src="/webCam.png"
          alt="Webcam placeholder"
          width={300}
          height={300}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircleIcon />
            Stop Recording...
          </h2>
        ) : (
          <h2 className="text-green-600 flex gap-2">
            <MicIcon />
            Record Answer
          </h2>
        )}
      </Button>
     
    </div>
  );
};

export default RecordAnswerSection;
