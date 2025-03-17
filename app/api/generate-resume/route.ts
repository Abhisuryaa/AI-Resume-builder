import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, jobTitle, jobDescription, experience, education, skills } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !jobTitle || !jobDescription || !experience || !education || !skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a resume using local logic instead of external API
    const generatedResume = generateResumeHTML(fullName, email, phone, jobTitle, jobDescription, experience, education, skills);

    // Return the generated resume
    return NextResponse.json({ resume: generatedResume });
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}

function generateResumeHTML(
  fullName: string,
  email: string,
  phone: string,
  jobTitle: string,
  jobDescription: string,
  experience: string,
  education: string,
  skills: string
): string {
  // Extract key requirements from job description
  const keyRequirements = extractKeywords(jobDescription);
  
  // Format the experience section
  const formattedExperience = formatExperienceSection(experience, keyRequirements);
  
  // Format the skills section to highlight matching skills
  const formattedSkills = formatSkillsSection(skills, keyRequirements);
  
  // Format education section
  const formattedEducation = formatEducationSection(education);

  // Generate HTML resume
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
    .contact-info {
      font-size: 14px;
      color: #555;
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
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${fullName}</div>
    <div class="contact-info">
      ${email} | ${phone} | ${jobTitle}
    </div>
  </div>

  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <div class="description">
    Dedicated ${jobTitle} with experience in ${formattedSkills.slice(0, 3).join(", ")}. 
    Proven track record of delivering high-quality results in fast-paced environments.
    Seeking to leverage my skills and experience to excel as a ${jobTitle}.
  </div>

  <div class="section-title">PROFESSIONAL EXPERIENCE</div>
  ${formattedExperience}

  <div class="section-title">EDUCATION</div>
  ${formattedEducation}

  <div class="section-title">SKILLS</div>
  <div class="skills-list">
    ${formattedSkills.map(skill => 
      keyRequirements.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase())) 
        ? `<div class="skill highlight">${skill}</div>` 
        : `<div class="skill">${skill}</div>`
    ).join('')}
  </div>
</body>
</html>
  `;
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
  
  return Array.from(new Set([...keywords, ...uniqueCapitalizedWords]));
}

function formatExperienceSection(experience: string, keywords: string[]): string {
  // Simple parsing of experience text
  // In a real implementation, this would use more sophisticated NLP
  const experienceEntries = experience.split(/\n{2,}/);
  
  return experienceEntries.map(entry => {
    // Try to extract job title, company, and dates
    const titleMatch = entry.match(/(?:^|\n)([^,\n]+)(?:,|at| - | at )([^,\n]+)(?:,|\n|$)/);
    const dateMatch = entry.match(/(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b)\s*(?:-|to|–)\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b|Present|Current)/i);
    
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
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      description = description.replace(regex, match => `<span class="highlight">${match}</span>`);
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

function formatSkillsSection(skills: string, keywords: string[]): string[] {
  // Parse skills into an array
  const skillsList = skills
    .split(/[,;•\n-]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
  
  // Move skills that match keywords to the front
  const prioritizedSkills = [
    ...skillsList.filter(skill => 
      keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
    ),
    ...skillsList.filter(skill => 
      !keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
    )
  ];
  
  // Remove duplicates
  return Array.from(new Set(prioritizedSkills));
}

function formatEducationSection(education: string): string {
  // Simple parsing of education text
  const educationEntries = education.split(/\n{2,}/);
  
  return educationEntries.map(entry => {
    // Try to extract degree, institution, and dates
    const degreeMatch = entry.match(/([^,\n]+)(?:,|from| - | from )([^,\n]+)/);
    const dateMatch = entry.match(/(\d{4})\s*(?:-|to|–)\s*(\d{4}|Present|Current)/i);
    
    let degree = '';
    let institution = '';
    let dates = '';
    let description = entry;
    
    if (degreeMatch) {
      degree = degreeMatch[1].trim();
      institution = degreeMatch[2].trim();
      description = description.replace(degreeMatch[0], '').trim();
    }
    
    if (dateMatch) {
      dates = `${dateMatch[1]} - ${dateMatch[2]}`;
      description = description.replace(dateMatch[0], '').trim();
    }
    
    return `
      <div class="education">
        <div><span class="job-title">${degree || 'Degree'}</span>, <span class="company">${institution || 'Institution'}</span></div>
        <div class="date">${dates || ''}</div>
        ${description ? `<div class="description">${description}</div>` : ''}
      </div>
    `;
  }).join('');
} 