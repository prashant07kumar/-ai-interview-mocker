"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewdata] = useState(null);
  const [mockinterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      console.log("Interview ID:", interviewId);
      getInterviewDetails(interviewId);
    }
  }, [interviewId]);

  const parseInterviewQA = (markdown) => {
    const questionPattern = /\*\*(?:\d+\.\s*Question|Question\s*\d*):.*?\*\*/gi;
    const answerPattern = /\*\*Answer(?: \(Example\))?:\*\*/i;

    const questionTitles = markdown.match(questionPattern);
    const qaBlocks = markdown.split(questionPattern).slice(1); // Skip intro if any

    return qaBlocks.map((block, index) => {
      const questionHeader = questionTitles?.[index] || `Question ${index + 1}`;
      const [questionText, answerText] = block.split(answerPattern);

      return {
        question:
          questionHeader.replace(/\*\*/g, "").trim() +
          " " +
          (questionText?.trim() ?? ""),
        answer: answerText?.trim() || "No answer provided",
      };
    });
  };

  const getInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        const rawJson = result[0].jsonMockresp;
        const parsed =
          typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;

        console.log("Parsed JSON:", parsed);

        const markdown = parsed.config?.name || "";
        const questionList = parseInterviewQA(markdown);

        console.log("Extracted Questions:", questionList);
        setMockInterviewQuestion(questionList);
        setInterviewdata(result[0]);
      } else {
        console.warn("No interview data found for this ID");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionSection
          mockinterviewQuestion={mockinterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockinterviewQuestion={mockinterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end-safe gap-6 ml-10 mb-5'>
        {activeQuestionIndex>0&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockinterviewQuestion?.length-1&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockinterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        <Button >End Interview</Button></Link>}
        
      </div>
    </div>
  );
}

export default StartInterview;
