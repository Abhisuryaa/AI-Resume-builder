import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8F9FA] via-[#E9ECEF] to-white bg-pattern">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#DEE2E6]/10 to-[#CED4DA]/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-[#DEE2E6]/10 to-[#CED4DA]/10 blur-3xl -z-10"></div>
      
      <div className="max-w-5xl w-full space-y-12 animate-fadeIn">
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#30BFBF] to-[#87CEEB] text-white p-3 rounded-lg shadow-md mb-6 max-w-2xl mx-auto">
            <p className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Now using built-in AI technology - no API key required!
            </p>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 gradient-text shimmer">
            AI-Powered Resume Builder
          </h1>
          <h1 className="text-5xl gradient-title sm:text-6xl sm:tracking-tight lg:text-7xl mb-4">
            Get Noticed With Your <span className="gradient-title-alt">Perfect Resume</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-[#30BFBF] via-[#87CEEB] to-[#FF8C69] mx-auto rounded-full mb-6"></div>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-[#1C0B19]/80">
            Generate optimized resumes tailored to specific job descriptions using <span className="highlight-text">advanced AI technology</span>.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="card card-hover glass-effect turquoise-glass">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#30BFBF]/10 rounded-full -mt-6 -mr-6 blur-xl"></div>
              <div className="px-8 py-10 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#30BFBF] to-[#87CEEB] mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C0B19]">Create New Resume</h3>
                </div>
                <div className="mt-4 text-[#1C0B19]/80">
                  <p>Start from scratch and build a new resume optimized for your target job. Our AI will help you highlight the most <span className="text-[#30BFBF] font-medium">relevant skills and experience</span>.</p>
                </div>
                <div className="mt-8">
                  <Link href="/create" className="btn-primary inline-flex items-center">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="card card-hover glass-effect coral-glass">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF8C69]/10 rounded-full -mt-6 -mr-6 blur-xl"></div>
              <div className="px-8 py-10 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FF8C69] to-[#FFCBA4] mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C0B19]">Optimize Existing Resume</h3>
                </div>
                <div className="mt-4 text-[#1C0B19]/80">
                  <p>Upload your existing resume and optimize it for a specific job description. Our AI will tailor it to match the requirements <span className="text-[#FF8C69] font-medium">perfectly</span>.</p>
                </div>
                <div className="mt-8">
                  <Link href="/optimize" className="btn-accent inline-flex items-center">
                    Upload Resume
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 card neutral-glass relative overflow-hidden gradient-border">
          <div className="px-8 py-10">
            <h3 className="text-2xl gradient-title mb-8">How It Works</h3>
            <div className="space-y-10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-[#30BFBF] to-[#87CEEB] text-white font-bold text-xl shadow-lg">
                    1
                  </div>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-bold text-[#1C0B19]">Input Job Description</h4>
                  <p className="mt-2 text-[#1C0B19]/80">
                    Paste the job description you're applying for to help our AI understand the <span className="highlight-text">requirements and key qualifications</span> needed.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#B8E1FF] text-[#1C0B19] font-bold text-xl shadow-lg">
                    2
                  </div>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-bold text-[#1C0B19]">AI Analysis</h4>
                  <p className="mt-2 text-[#1C0B19]/80">
                    Our advanced AI analyzes the job requirements, identifies <span className="text-[#30BFBF] font-medium">key skills</span>, and determines the most important qualifications for the position.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-[#FF8C69] to-[#FFCBA4] text-white font-bold text-xl shadow-lg animate-pulse-soft">
                    3
                  </div>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-bold text-[#1C0B19]">Resume Generation</h4>
                  <p className="mt-2 text-[#1C0B19]/80">
                    Get a professionally formatted, tailored resume that highlights your relevant skills and experience for the specific job, <span className="highlight-text">increasing your chances</span> of getting an interview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-block neutral-glass p-6 rounded-xl mb-8">
            <p className="text-[#1C0B19] mb-2 font-medium">Ready to create a resume that stands out?</p>
            <p className="text-[#1C0B19]/70 text-sm">Join thousands of job seekers who've landed their dream jobs</p>
          </div>
          <Link href="/create" className="btn-accent inline-flex items-center text-lg px-8 py-3">
            Get Started Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}