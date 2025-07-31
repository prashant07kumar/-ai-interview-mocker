"use client";
import React, { use,useEffect } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
const Interview = ({ params }) => {
   const resolvedParams = use(params); 
  const interviewId = resolvedParams.interviewId;
  const [GetInterviewdata, setGetInterviewdata] = React.useState(null);
  const [webCamEnabled, setWebCamEnabled] = React.useState(false);
  useEffect(() => {
    const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    setGetInterviewdata(result[0]);
  };
    GetInterviewDetails();
  }, [interviewId]);
  
  
  return (
    <div className="my-10 px-6 flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-8">Let's Get Started</h2>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        {/* LEFT: Interview Info */}
        <div className="flex-1 space-y-4">
  {GetInterviewdata ? (
    <div className="bg-white rounded-xl p-5 shadow-md border space-y-3">
      <p className="text-base font-semibold">
        <strong>Job Role/Job Position:</strong>{" "}
        {GetInterviewdata.jobPosition}
      </p>
      <p className="text-base font-semibold">
        <strong>Job Description/Tech Stack:</strong>{" "}
        {GetInterviewdata.jobDesc}
      </p>
      <p className="text-base font-semibold">
        <strong>Years of Experience:</strong>{" "}
        {GetInterviewdata.jobExperience}
      </p>
    </div>
  ) : (
    <div className="bg-white rounded-xl p-5 shadow-md border text-gray-500">
      Loading interview details...
    </div>
  )}


          {/* Info Card */}
          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg flex items-start gap-3 shadow-sm">
            <Lightbulb className="text-yellow-600 mt-1 w-10 h-10" />
            <p className="text-sm text-yellow-900">
              <strong>Information:</strong> Enable Video Web Cam and Microphone
              to start your AI generated mock interview. It has 5 questions
              which you can answer, and at the end you'll get a report based on
              your answers.
              <br />
              <strong>NOTE:</strong> We never record your video. Webcam access
              can be disabled at any time.
            </p>
          </div>
        </div>

        {/* RIGHT: Webcam */}
        <div className="flex-1 flex flex-col items-center justify-between gap-6">
          <div className="w-full h-[280px] flex items-center justify-center border rounded-xl bg-secondary shadow-inner">
            {webCamEnabled ? (
              <Webcam
                audio
                mirrored
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                className="rounded-xl w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <WebcamIcon className="h-20 w-20 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Enable WebCam and Microphone
                </p>
              </div>
            )}
          </div>

          {!webCamEnabled && (
            <Button
              onClick={() => setWebCamEnabled(true)}
              className="flex items-center gap-2"
            >
              <VideoIcon className="w-4 h-4" />
              Enable WebCam & Microphone
            </Button>
          )}
          <Link href={"/dashboard/interview/" + interviewId + "/start"}>
            {/* Start Interview Button */}
            <Button className="self-end mt-auto bg-indigo-600 hover:bg-indigo-700 text-white">
              Start Interview
            </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Interview;
