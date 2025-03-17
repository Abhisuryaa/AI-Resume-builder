'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const optimizeFormSchema = z.object({
  currentResume: z.string().min(10, 'Current resume is required (min 10 characters)'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobDescription: z.string().min(10, 'Job description is required (min 10 characters)'),
});

type OptimizeFormValues = z.infer<typeof optimizeFormSchema>;

export default function OptimizeResumePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OptimizeFormValues>({
    resolver: zodResolver(optimizeFormSchema),
  });

  const onSubmit = async (data: OptimizeFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/optimize-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize resume');
      }

      const result = await response.json();
      setOptimizedResume(result.resume);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      alert('Failed to optimize resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] via-[#E9ECEF] to-white bg-pattern">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#DEE2E6]/10 to-[#CED4DA]/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-[#DEE2E6]/10 to-[#CED4DA]/10 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <div className="mb-10">
            <Link href="/" className="text-[#30BFBF] hover:text-[#30BFBF]/80 inline-flex items-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="flex items-center mt-6 mb-2">
              <h1 className="text-4xl gradient-title">Optimize Existing Resume</h1>
              <span className="ml-4 px-3 py-1 text-xs bg-[#FF8C69]/20 text-[#FF8C69] rounded-full border border-[#FF8C69]/30">AI-Powered</span>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-[#30BFBF] via-[#87CEEB] to-[#FF8C69] rounded-full mb-4"></div>
            <p className="text-[#1C0B19]/80 text-lg">
              Paste your existing resume and the job description to get an <span className="highlight-text">optimized version</span> tailored for the position.
            </p>
          </div>

          {!optimizedResume ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 card glass-effect p-8 relative gradient-border">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DEE2E6]/20 via-[#E9ECEF]/20 to-[#F8F9FA]/20 rounded-full -mt-10 -mr-10 blur-xl"></div>
              
              <div className="form-section sky-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Current Resume
                </h2>
                <div>
                  <label htmlFor="currentResume" className="block text-sm font-medium text-[#1C0B19] mb-1">
                    Paste your current resume <span className="text-[#FF8C69]">*</span>
                  </label>
                  <textarea
                    id="currentResume"
                    rows={10}
                    {...register('currentResume')}
                    className="input-field"
                    placeholder="Paste your current resume text here..."
                  />
                  {errors.currentResume && (
                    <p className="mt-1 text-sm text-[#FF8C69]">{errors.currentResume.message}</p>
                  )}
                </div>
              </div>

              <div className="form-section coral-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#FF8C69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Job Details <span className="text-xs text-[#1C0B19]/60 ml-2">(This helps our AI tailor your resume)</span>
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Job Title <span className="text-[#FF8C69]">*</span>
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      {...register('jobTitle')}
                      className="input-field"
                      placeholder="Software Engineer"
                    />
                    {errors.jobTitle && (
                      <p className="mt-1 text-sm text-[#FF8C69]">{errors.jobTitle.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Job Description <span className="text-[#FF8C69]">*</span>
                    </label>
                    <textarea
                      id="jobDescription"
                      rows={6}
                      {...register('jobDescription')}
                      className="input-field"
                      placeholder="Paste the job description here..."
                    />
                    {errors.jobDescription && (
                      <p className="mt-1 text-sm text-[#FF8C69]">{errors.jobDescription.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <div className="text-[#1C0B19]/60 text-sm italic flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#30BFBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  All fields marked with <span className="text-[#FF8C69]">*</span> are required
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-accent flex items-center text-lg px-8 py-3"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Optimizing...
                    </>
                  ) : (
                    <>
                      Optimize Resume
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="card glass-effect p-8 relative gradient-border">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DEE2E6]/20 via-[#E9ECEF]/20 to-[#F8F9FA]/20 rounded-full -mt-10 -mr-10 blur-xl"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-[#30BFBF] to-[#87CEEB] mr-4 shadow-lg shimmer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl gradient-title">Your Optimized Resume</h2>
                <span className="ml-4 px-3 py-1 text-xs bg-[#30BFBF]/20 text-[#30BFBF] rounded-full border border-[#30BFBF]/30 animate-pulse-soft">Ready to Download</span>
              </div>
              <div className="prose max-w-none border border-[#DEE2E6]/30 p-8 rounded-lg bg-white bg-opacity-80 backdrop-blur-sm shadow-inner">
                <div dangerouslySetInnerHTML={{ __html: optimizedResume }} />
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setOptimizedResume(null)}
                  className="btn-secondary flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Edit Information
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([optimizedResume], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'optimized-resume.html';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="btn-accent flex items-center"
                >
                  Download Resume
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 