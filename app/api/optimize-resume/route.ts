import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobDescription, currentResume } = body;

    // Validate required fields
    if (!jobDescription || !currentResume) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate an optimized resume using local logic instead of external API
    const optimizedResume = optimizeResumeHTML(currentResume, jobDescription);

    // Return the optimized resume
    return NextResponse.json({ resume: optimizedResume });
  } catch (error) {
    console.error('Error optimizing resume:', error);
    return NextResponse.json({ error: 'Failed to optimize resume' }, { status: 500 });
  }
}

function optimizeResumeHTML(currentResume: string, jobDescription: string): string {
  // Extract key requirements from job description
  const keyRequirements = extractKeywords(jobDescription);
  
  // Parse the current resume HTML if it's in HTML format
  let parsedResume = currentResume;
  
  // If the resume is in HTML format, extract the text content
  if (currentResume.toLowerCase().includes('<html') || 
      currentResume.toLowerCase().includes('<body') || 
      currentResume.toLowerCase().includes('<div')) {
    // Simple HTML parsing - in a real implementation, this would use a proper HTML parser
    parsedResume = currentResume
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '\n')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }
  
  // Extract sections from the resume
  const sections = extractSections(parsedResume);
  
  // Generate optimized HTML
  return generateOptimizedHTML(sections, keyRequirements, jobDescription);
}

function extractKeywords(jobDescription: string): string[] {
  // Simple keyword extraction - in a real implementation, this would be more sophisticated
  const commonTechKeywords = [
    'javascript', 'typescript', 'react', 'node', 'python', 'java', 'c#', 'c++',
    'html', 'css', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure',
    'docker', 'kubernetes', 'ci/cd', 'agile', 'scrum', 'git', 'rest', 'api',
    'frontend', 'backend', 'fullstack', 'mobile', 'web', 'cloud', 'devops',
    'machine learning', 'ai', 'data science', 'analytics', 'big data'
  ];
  
  const words = jobDescription.toLowerCase().split(/\W+/);
  const keywords = commonTechKeywords.filter(keyword => 
    words.includes(keyword) || jobDescription.toLowerCase().includes(keyword)
  );
  
  // Add any capitalized words that might be important (company names, products, etc.)
  const capitalizedWords = jobDescription.match(/\b[A-Z][a-zA-Z]{2,}\b/g) || [];
  const uniqueCapitalizedWords = Array.from(new Set(capitalizedWords)).map(word => word.toLowerCase());
  
  // Add common job requirement phrases
  const phrases = [
    'years of experience', 'team player', 'communication skills', 'problem solving',
    'attention to detail', 'leadership', 'project management', 'time management',
    'customer service', 'analytical skills', 'creative thinking', 'innovative'
  ];
  
  const matchedPhrases = phrases.filter(phrase => 
    jobDescription.toLowerCase().includes(phrase)
  );
  
  return Array.from(new Set([...keywords, ...uniqueCapitalizedWords, ...matchedPhrases]));
}

function extractSections(resumeText: string): Record<string, string> {
  const sections: Record<string, string> = {
    summary: '',
    experience: '',
    education: '',
    skills: ''
  };
  
  // Try to identify sections based on common headers
  const lines = resumeText.split('\n');
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;
    
    // Check for section headers
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile')) {
      currentSection = 'summary';
      continue;
    } else if (lowerLine.includes('experience') || lowerLine.includes('employment') || lowerLine.includes('work history')) {
      currentSection = 'experience';
      continue;
    } else if (lowerLine.includes('education') || lowerLine.includes('academic') || lowerLine.includes('degree')) {
      currentSection = 'education';
      continue;
    } else if (lowerLine.includes('skills') || lowerLine.includes('technologies') || lowerLine.includes('competencies')) {
      currentSection = 'skills';
      continue;
    }
    
    // Add content to the current section
    if (currentSection && sections[currentSection] !== undefined) {
      sections[currentSection] += line + '\n';
    }
  }
  
  // If we couldn't identify sections, make a best guess
  if (!sections.experience && !sections.education && !sections.skills) {
    // Simple heuristic: first 20% is summary, next 50% is experience, next 15% is education, last 15% is skills
    const totalLines = lines.length;
    const summaryEnd = Math.floor(totalLines * 0.2);
    const experienceEnd = Math.floor(totalLines * 0.7);
    const educationEnd = Math.floor(totalLines * 0.85);
    
    sections.summary = lines.slice(0, summaryEnd).join('\n');
    sections.experience = lines.slice(summaryEnd, experienceEnd).join('\n');
    sections.education = lines.slice(experienceEnd, educationEnd).join('\n');
    sections.skills = lines.slice(educationEnd).join('\n');
  }
  
  return sections;
}

function generateOptimizedHTML(
  sections: Record<string, string>,
  keywords: string[],
  jobDescription: string
): string {
  // Extract skills from the skills section and job description
  const skillsList = extractSkills(sections.skills, jobDescription);
  
  // Optimize the summary to highlight relevant keywords
  const optimizedSummary = optimizeSummary(sections.summary, keywords, jobDescription);
  
  // Optimize the experience section to highlight relevant experience
  const optimizedExperience = optimizeExperience(sections.experience, keywords);
  
  // Generate HTML
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #30BFBF;
      padding-bottom: 10px;
    }
    .name {
      font-size: 28px;
      font-weight: bold;
      color: #1C0B19;
      margin-bottom: 5px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #30BFBF;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    .job-title {
      font-weight: bold;
      color: #1C0B19;
    }
    .company {
      font-weight: bold;
    }
    .date {
      color: #777;
      font-style: italic;
    }
    .description {
      margin-top: 5px;
      margin-bottom: 15px;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill {
      background-color: #f0f0f0;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 14px;
    }
    .skill.highlight {
      background-color: #d6edff;
      font-weight: bold;
    }
    .bullet-list {
      margin-top: 5px;
      padding-left: 20px;
    }
    .highlight {
      background-color: rgba(0, 145, 110, 0.1);
      padding: 0 2px;
    }
    .job-match {
      background-color: #f8f9fa;
      border-left: 3px solid #30BFBF;
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 0 5px 5px 0;
    }
    .match-title {
      font-size: 16px;
      font-weight: bold;
      color: #30BFBF;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="job-match">
    <div class="match-title">Optimized for Job Requirements</div>
    <p>This resume has been tailored to highlight your qualifications that best match the job description.</p>
  </div>

  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <div class="description">
    ${optimizedSummary}
  </div>

  <div class="section-title">PROFESSIONAL EXPERIENCE</div>
  ${optimizedExperience}

  <div class="section-title">EDUCATION</div>
  ${sections.education}

  <div class="section-title">SKILLS</div>
  <div class="skills-list">
    ${skillsList.map(skill => 
      keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase())) 
        ? `<div class="skill highlight">${skill}</div>` 
        : `<div class="skill">${skill}</div>`
    ).join('')}
  </div>
</body>
</html>
  `;
}

function extractSkills(skillsSection: string, jobDescription: string): string[] {
  // Extract skills from the skills section
  const skillsList = skillsSection
    .split(/[,;•\n-]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
  
  // Extract potential skills from job description
  const jobSkills = jobDescription
    .split(/[,;•\n-]/)
    .map(part => part.trim())
    .filter(part => 
      part.toLowerCase().includes('experience with') || 
      part.toLowerCase().includes('knowledge of') ||
      part.toLowerCase().includes('proficient in') ||
      part.toLowerCase().includes('familiar with')
    )
    .map(part => {
      const match = part.match(/(?:experience with|knowledge of|proficient in|familiar with)\s+(.+)/i);
      return match ? match[1].trim() : '';
    })
    .filter(skill => skill.length > 0);
  
  // Combine and prioritize skills that match job description
  const keywordsInJobDescription = jobDescription.toLowerCase().split(/\W+/);
  
  const prioritizedSkills = [
    ...skillsList.filter(skill => 
      keywordsInJobDescription.some(keyword => 
        keyword.length > 3 && skill.toLowerCase().includes(keyword.toLowerCase())
      )
    ),
    ...skillsList.filter(skill => 
      !keywordsInJobDescription.some(keyword => 
        keyword.length > 3 && skill.toLowerCase().includes(keyword.toLowerCase())
      )
    ),
    ...jobSkills
  ];
  
  // Remove duplicates
  return Array.from(new Set(prioritizedSkills));
}

function optimizeSummary(summary: string, keywords: string[], jobDescription: string): string {
  if (!summary) {
    // Generate a generic summary based on keywords
    return `Experienced professional with expertise in ${keywords.slice(0, 3).join(', ')}, seeking to leverage skills and experience to excel in a new role. Proven track record of delivering high-quality results in fast-paced environments.`;
  }
  
  // Highlight keywords in the summary
  let optimizedSummary = summary;
  keywords.forEach(keyword => {
    if (keyword.length > 3) { // Only highlight meaningful keywords
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      optimizedSummary = optimizedSummary.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
  });
  
  return optimizedSummary;
}

function optimizeExperience(experience: string, keywords: string[]): string {
  if (!experience) return '';
  
  // Split experience into entries
  const experienceEntries = experience.split(/\n{2,}/);
  
  return experienceEntries.map(entry => {
    // Try to extract job title, company, and dates
    const titleMatch = entry.match(/(?:^|\n)([^,\n]+)(?:,|at| - | at )([^,\n]+)(?:,|\n|$)/);
    const dateMatch = entry.match(/(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b|\d{4})\s*(?:-|to|–)\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b|\d{4}|Present|Current)/i);
    
    let jobTitle = '';
    let company = '';
    let dates = '';
    let description = entry;
    
    if (titleMatch) {
      jobTitle = titleMatch[1].trim();
      company = titleMatch[2].trim();
      description = description.replace(titleMatch[0], '').trim();
    }
    
    if (dateMatch) {
      dates = `${dateMatch[1]} - ${dateMatch[2]}`;
      description = description.replace(dateMatch[0], '').trim();
    }
    
    // Highlight keywords in the description
    keywords.forEach(keyword => {
      if (keyword.length > 3) { // Only highlight meaningful keywords
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        description = description.replace(regex, match => `<span class="highlight">${match}</span>`);
      }
    });
    
    // Format the description as bullet points if it's not already
    if (!description.includes('•') && !description.includes('-')) {
      const sentences = description.split(/\.\s+/);
      description = '<ul class="bullet-list">' + 
        sentences.filter(s => s.length > 10).map(s => `<li>${s}${!s.endsWith('.') ? '.' : ''}</li>`).join('') + 
        '</ul>';
    } else {
      // If it already has bullet points, preserve them
      const bullets = description.split(/(?:•|-)\s+/).filter(b => b.trim().length > 0);
      description = '<ul class="bullet-list">' + 
        bullets.map(b => `<li>${b}</li>`).join('') + 
        '</ul>';
    }
    
    return `
      <div class="job">
        <div><span class="job-title">${jobTitle || 'Position'}</span> at <span class="company">${company || 'Company'}</span></div>
        <div class="date">${dates || 'Date range'}</div>
        <div class="description">${description}</div>
      </div>
    `;
  }).join('');
} 