'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const resumeFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobDescription: z.string().min(10, 'Job description is required (min 10 characters)'),
  experience: z.string().min(10, 'Experience is required (min 10 characters)'),
  education: z.string().min(10, 'Education is required (min 10 characters)'),
  skills: z.string().min(5, 'Skills are required (min 5 characters)'),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export default function CreateResumePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
  });

  const onSubmit = async (data: ResumeFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const result = await response.json();
      setGeneratedResume(result.resume);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
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
              <h1 className="text-4xl gradient-title">Create Optimized Resume</h1>
              <span className="ml-4 px-3 py-1 text-xs bg-[#FF8C69]/20 text-[#FF8C69] rounded-full border border-[#FF8C69]/30">AI-Powered</span>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-[#30BFBF] via-[#87CEEB] to-[#FF8C69] rounded-full mb-4"></div>
            <p className="text-[#1C0B19]/80 text-lg">
              Fill in your details and the job description to generate an <span className="highlight-text">optimized resume</span>.
            </p>
          </div>

          {!generatedResume ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 card glass-effect p-8 relative gradient-border">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DEE2E6]/20 via-[#E9ECEF]/20 to-[#F8F9FA]/20 rounded-full -mt-10 -mr-10 blur-xl"></div>
              
              <div className="form-section turquoise-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#30BFBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Full Name <span className="text-[#FF8C69]">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName')}
                      className="input-field"
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-[#FF8C69]">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Email <span className="text-[#FF8C69]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="input-field"
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-[#FF8C69]">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Phone <span className="text-[#FF8C69]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="input-field"
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-[#FF8C69]">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-[#1C0B19] mb-1">
                      Desired Job Title <span className="text-[#FF8C69]">*</span>
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
                </div>
              </div>

              <div className="form-section coral-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#FF8C69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Job Description <span className="text-xs text-[#1C0B19]/60 ml-2">(This helps our AI tailor your resume)</span>
                </h2>
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-[#1C0B19] mb-1">
                    Paste the job description here <span className="text-[#FF8C69]">*</span>
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

              <div className="form-section sky-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#87CEEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Work Experience <span className="text-xs text-[#1C0B19]/60 ml-2">(Be specific about achievements)</span>
                </h2>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-[#1C0B19] mb-1">
                    List your work experience <span className="text-[#FF8C69]">*</span>
                  </label>
                  <textarea
                    id="experience"
                    rows={4}
                    {...register('experience')}
                    className="input-field"
                    placeholder="Example: Senior Developer at XYZ Company (2018-2022). Responsible for developing and maintaining web applications..."
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-[#FF8C69]">{errors.experience.message}</p>
                  )}
                </div>
              </div>

              <div className="form-section neutral-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#CED4DA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Education
                </h2>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-[#1C0B19] mb-1">
                    List your education <span className="text-[#FF8C69]">*</span>
                  </label>
                  <textarea
                    id="education"
                    rows={3}
                    {...register('education')}
                    className="input-field"
                    placeholder="Example: Bachelor of Science in Computer Science, University of XYZ (2014-2018)"
                  />
                  {errors.education && (
                    <p className="mt-1 text-sm text-[#FF8C69]">{errors.education.message}</p>
                  )}
                </div>
              </div>

              <div className="form-section neutral-glass">
                <h2 className="section-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#DEE2E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Skills <span className="text-xs text-[#1C0B19]/60 ml-2">(Include both technical & soft skills)</span>
                </h2>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-[#1C0B19] mb-1">
                    List your skills <span className="text-[#FF8C69]">*</span>
                  </label>
                  <textarea
                    id="skills"
                    rows={3}
                    {...register('skills')}
                    className="input-field"
                    placeholder="Example: JavaScript, React, Node.js, Python, Project Management, Team Leadership"
                  />
                  {errors.skills && (
                    <p className="mt-1 text-sm text-[#FF8C69]">{errors.skills.message}</p>
                  )}
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
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Resume
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
                <div dangerouslySetInnerHTML={{ __html: generatedResume }} />
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setGeneratedResume(null)}
                  className="btn-secondary flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Edit Information
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedResume], { type: 'text/html' });
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