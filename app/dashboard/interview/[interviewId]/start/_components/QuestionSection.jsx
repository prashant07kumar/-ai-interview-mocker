import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockinterviewQuestion, activeQuestionIndex }) {

   const textToSpeech = (text) => {
    if('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
    else{
        alert("Sorry, your browser does not support text to speech.");
    }
   } 
  return mockinterviewQuestion&&(
    <div className="p-5 border rounded-lg  my-10 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
        {mockinterviewQuestion &&
          mockinterviewQuestion.map((item, index) => (
            <h2
               key={item.id || index} // Use item.id if available, otherwise use index
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex == index && "bg-primary text-cyan-600"}`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className='my-5 text-md md:text-lg '>{mockinterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockinterviewQuestion[activeQuestionIndex]?.question)}/>
      <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
        <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb/>
            <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>
            Click on Record Answer when you want to answer the question. At the end of interview we will give you feedback along with correct answer for each question and your answer to compare it.
        </h2>
      </div>
    </div>
  );
}

export default QuestionSection;
