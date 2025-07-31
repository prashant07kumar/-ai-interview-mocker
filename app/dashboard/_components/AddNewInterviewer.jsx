"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAi";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { json } from "drizzle-orm/gel-core";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

function AddNewInterviewer() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jobPosition, setJobPosition] = React.useState("");
  const [jobDesc, setJobDesc] = React.useState("");
  const [jobExperience, setJobExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [jsonResponse, setJsonResponse] = React.useState([]);

  const router= useRouter();

  const { user } = useUser();
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    // Here you can handle the form submission, like sending data to an API or updating state
    const InputPromt =
      "Job Position:" +
      jobPosition +
      ",Job description:" +
      jobDesc +
      ", years of experience:" +
      jobExperience +
      ", Depends on the job position and years of experience, the AI will generate a " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions that are relevant to the role and experience level. The AI will also provide answers to these questions based on the job description and tech stack provided.";

    const result = await chatSession.sendMessage(InputPromt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResponse);
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockresp: json(MockJsonResponse),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted Mock Interview:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId);
      }
    } else {
      console.error("Failed to generate mock interview response");
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role and years of
                    Experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position </label>
                    <Input
                      placeholder="Ex.Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className=" my-3">
                    <label>Job Description/Tech Stack (In Short) </label>
                    <Textarea
                      placeholder="Ex.React,Angular,NodeJs,MySql etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex.5"
                      max="50"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterviewer;
