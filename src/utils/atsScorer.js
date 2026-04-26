/**
 * ATS Scoring Engine
 * Scores a CV out of 100 across 5 dimensions
 */

const KEYWORDS = [
  'react', 'angular', 'vue', 'javascript', 'typescript', 'node',
  '.net', 'c#', 'python', 'java', 'sql', 'mysql', 'postgresql',
  'mongodb', 'api', 'rest', 'graphql', 'aws', 'azure', 'docker',
  'kubernetes', 'git', 'ci/cd', 'agile', 'scrum', 'redux',
  'html', 'css', 'sass', 'tailwind', 'next.js', 'express',
  'microservices', 'linux', 'testing', 'jest', 'figma', 'ux',
];

const ACTION_VERBS = [
  'built', 'developed', 'led', 'improved', 'designed', 'implemented',
  'created', 'managed', 'optimized', 'delivered', 'collaborated',
  'architected', 'deployed', 'migrated', 'integrated', 'launched',
  'increased', 'reduced', 'streamlined', 'automated', 'mentored',
  'established', 'negotiated', 'researched', 'analyzed', 'spearheaded',
  'oversaw', 'coordinated', 'maintained', 'refactored',
];

const ACHIEVEMENT_PATTERN = /(\d+%|\d+x|\d+\+|(\$|€|£)\s*\d+|\d+\s*(million|thousand|k\b|m\b|users|requests|services|teams))/gi;

/**
 * Score breakdown:
 *  - Sections present:      20 pts
 *  - Keyword matches:       25 pts
 *  - Action verbs:          20 pts
 *  - Measurable achievements: 20 pts
 *  - Contact completeness:  15 pts
 */
export function computeATSScore(cv) {
  const { personalInfo, skills, experience, education, projects } = cv;
  const allText = buildFullText(cv).toLowerCase();

  // 1. SECTIONS (20 pts)
  const sectionsScore = scoreSections({ personalInfo, skills, experience, education, projects });

  // 2. KEYWORDS (25 pts)
  const { keywordScore, matchedKeywords } = scoreKeywords(allText);

  // 3. ACTION VERBS (20 pts)
  const { verbScore, matchedVerbs } = scoreActionVerbs(allText);

  // 4. ACHIEVEMENTS (20 pts)
  const achievementScore = scoreAchievements(allText);

  // 5. CONTACT (15 pts)
  const contactScore = scoreContact(personalInfo);

  const total = Math.round(
    sectionsScore.score +
    keywordScore +
    verbScore +
    achievementScore.score +
    contactScore.score
  );

  const suggestions = buildSuggestions({
    sectionsScore,
    keywordScore,
    matchedKeywords,
    verbScore,
    matchedVerbs,
    achievementScore,
    contactScore,
    personalInfo,
    skills,
    experience,
    education,
  });

  return {
    total: Math.min(100, total),
    breakdown: {
      sections:     { score: sectionsScore.score,    max: 20 },
      keywords:     { score: Math.round(keywordScore), max: 25 },
      verbs:        { score: Math.round(verbScore),   max: 20 },
      achievements: { score: achievementScore.score,  max: 20 },
      contact:      { score: contactScore.score,      max: 15 },
    },
    matchedKeywords,
    matchedVerbs,
    suggestions,
  };
}

/* --- Helpers --- */

function buildFullText(cv) {
  const parts = [];
  const { personalInfo, skills, experience, education, projects } = cv;

  if (personalInfo) {
    Object.values(personalInfo).forEach(v => v && parts.push(v));
  }
  if (Array.isArray(skills)) parts.push(skills.join(' '));
  if (Array.isArray(experience)) {
    experience.forEach(e => {
      parts.push(e.company || '', e.role || '', e.duration || '', e.description || '');
    });
  }
  if (Array.isArray(education)) {
    education.forEach(e => {
      parts.push(e.institution || '', e.degree || '', e.year || '');
    });
  }
  if (Array.isArray(projects)) {
    projects.forEach(p => {
      parts.push(p.name || '', p.tech || '', p.description || '');
    });
  }
  return parts.join(' ');
}

function scoreSections({ personalInfo, skills, experience, education, projects }) {
  const checks = {
    personalInfo:  personalInfo?.name?.trim()?.length > 0,
    skills:        Array.isArray(skills) && skills.length > 0,
    experience:    Array.isArray(experience) && experience.length > 0,
    education:     Array.isArray(education) && education.length > 0,
    summary:       personalInfo?.summary?.trim()?.length > 30,
    projects:      Array.isArray(projects) && projects.length > 0,
  };
  const weights = { personalInfo: 5, skills: 3, experience: 5, education: 3, summary: 2, projects: 2 };
  let score = 0;
  Object.keys(weights).forEach(k => { if (checks[k]) score += weights[k]; });
  return { score: Math.min(score, 20), checks };
}

function scoreKeywords(text) {
  const matched = KEYWORDS.filter(kw => text.includes(kw));
  // Scale: 5 keywords = full 25 pts; diminishing beyond
  const score = Math.min(25, (matched.length / 5) * 25);
  return { keywordScore: score, matchedKeywords: matched };
}

function scoreActionVerbs(text) {
  const matched = ACTION_VERBS.filter(v => text.includes(v));
  const score = Math.min(20, (matched.length / 4) * 20);
  return { verbScore: score, matchedVerbs: matched };
}

function scoreAchievements(text) {
  const matches = text.match(ACHIEVEMENT_PATTERN) || [];
  const score = Math.min(20, matches.length * 5);
  return { score, count: matches.length };
}

function scoreContact(personalInfo) {
  if (!personalInfo) return { score: 0, missing: ['email', 'phone', 'location'] };
  const fields = ['email', 'phone', 'location'];
  const present = fields.filter(f => personalInfo[f]?.trim()?.length > 0);
  const score = Math.round((present.length / fields.length) * 15);
  return { score, missing: fields.filter(f => !personalInfo[f]?.trim()) };
}

function buildSuggestions({ sectionsScore, keywordScore, matchedKeywords, verbScore, matchedVerbs, achievementScore, contactScore, personalInfo, skills, experience, education }) {
  const suggestions = [];

  if (!sectionsScore.checks.summary) {
    suggestions.push({ type: 'warn', text: 'Add a professional summary — ATS systems rank profiles with summaries higher.' });
  }
  if (!sectionsScore.checks.experience) {
    suggestions.push({ type: 'warn', text: 'Add at least one work experience entry.' });
  }
  if (!sectionsScore.checks.education) {
    suggestions.push({ type: 'warn', text: 'Add your education history.' });
  }
  if (!sectionsScore.checks.skills || (Array.isArray(skills) && skills.length < 5)) {
    suggestions.push({ type: 'warn', text: 'Include at least 5–8 relevant technical skills.' });
  }
  if (keywordScore < 15) {
    const missing = KEYWORDS.filter(k => !matchedKeywords.includes(k)).slice(0, 5);
    suggestions.push({ type: 'warn', text: `Add more industry keywords. Consider: ${missing.join(', ')}` });
  } else {
    suggestions.push({ type: 'good', text: `Great keyword coverage! Matched: ${matchedKeywords.slice(0, 4).join(', ')}${matchedKeywords.length > 4 ? ` +${matchedKeywords.length - 4} more` : ''}.` });
  }
  if (verbScore < 10) {
    suggestions.push({ type: 'warn', text: 'Use strong action verbs like "Built", "Led", "Optimized", "Delivered".' });
  } else {
    suggestions.push({ type: 'good', text: `Good use of action verbs: ${matchedVerbs.slice(0, 3).join(', ')}.` });
  }
  if (achievementScore.count === 0) {
    suggestions.push({ type: 'warn', text: 'Add quantifiable achievements (e.g., "Increased performance by 40%", "Served 10,000+ users").' });
  } else {
    suggestions.push({ type: 'good', text: `Found ${achievementScore.count} measurable achievement(s). Recruiters love numbers!` });
  }
  if (contactScore.missing.length > 0) {
    suggestions.push({ type: 'warn', text: `Missing contact info: ${contactScore.missing.join(', ')}.` });
  }
  if (!personalInfo?.title) {
    suggestions.push({ type: 'warn', text: 'Add a professional title (e.g., "Senior Frontend Engineer").' });
  }

  return suggestions;
}
