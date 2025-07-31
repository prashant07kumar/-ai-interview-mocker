import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Image / Marketing */}
      <div className="hidden lg:flex w-full lg:w-1/2 relative">
        <img
          src="img.jpg"
          alt="AI Interview Assistant"
          className="w-full h-full object-fit"
        />
        

        {/* Text Content */}
        <div className="absolute z-10 bottom-10 left-10 text-white max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Welcome to AI Interviewer Mocker</h2>
          <p className="mt-3 text-lg text-gray-200">
            Practice smarter. Mock interviews, instant feedback, and AI-powered question generation to help you land your dream job.
          </p>
        </div>
      </div>

      {/* Right Side: Sign-In */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-green-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign in to your account</h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <SignIn appearance={{
              elements: {
                card: "shadow-none",
              },
            }} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
