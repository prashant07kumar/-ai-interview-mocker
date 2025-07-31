"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Feedback() {
  const { interviewId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (!interviewId) return;
    const GetFeedback = async () => {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);
      console.log("User Answers:", result);
      setFeedbackList(result);
    };
    GetFeedback();
  }, [interviewId]);

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulation!!!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is Your Interview feedback
          </h2>
         
          <h2 className="text-md text-gray-500">
            Find below interview question with correct answer, your answer, and
            feedback for improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 hover:bg-secondary/80 transition-colors w-full">
                {item.question}
                <ChevronsUpDownIcon className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-gray-700">
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating : </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-950">
                    <strong>Your Answer : </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-950">
                    <strong>Correct Answer : </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-950">
                    <strong>Feedback : </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Link href="/dashboard">
        <Button className="mt-6">Go Home</Button>
      </Link>
    </div>
  );
}

export default Feedback;
