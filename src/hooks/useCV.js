import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const INITIAL_STATE = {
  personalInfo: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    website: 'https://johndoe.com',
    profileImage: '',
    sidebarColor: '#1e293b',
    accentColor: '#3b82f6',
    summary: 'Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly.'
  },
  skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'Tech Corp',
      role: 'Lead Developer',
      duration: '2020 - Present',
      description: 'Led a team of 5 developers to build a new SaaS product using React and Node.js. Improved performance by 40% and delivered on time.'
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: 'State University',
      degree: 'B.S. Computer Science',
      year: '2019'
    }
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'E-commerce Platform',
      tech: 'React, Redux, Node.js',
      description: 'Built a full-stack e-commerce platform that increased sales by 25%.'
    }
  ],
  template: 'classic',
  darkMode: false
};

export function useCV() {
  const [cvData, setCvData] = useLocalStorage('cv-builder-data', INITIAL_STATE);

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSkills = (newSkills) => {
    setCvData(prev => ({ ...prev, skills: newSkills }));
  };

  const addListItem = (listName, defaultItem) => {
    setCvData(prev => ({
      ...prev,
      [listName]: [...prev[listName], { ...defaultItem, id: crypto.randomUUID() }]
    }));
  };

  const updateListItem = (listName, id, field, value) => {
    setCvData(prev => ({
      ...prev,
      [listName]: prev[listName].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeListItem = (listName, id) => {
    setCvData(prev => ({
      ...prev,
      [listName]: prev[listName].filter(item => item.id !== id)
    }));
  };

  const reorderList = (listName, startIndex, endIndex) => {
    setCvData(prev => {
      const result = Array.from(prev[listName]);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, [listName]: result };
    });
  };

  const updateTemplate = (template) => {
    setCvData(prev => ({ ...prev, template }));
  };

  const toggleDarkMode = () => {
    setCvData(prev => {
      const newDarkMode = !prev.darkMode;
      if (newDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      return { ...prev, darkMode: newDarkMode };
    });
  };

  // Set initial dark mode on mount based on saved state
  useState(() => {
    if (cvData.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  });

  return {
    cvData,
    updatePersonalInfo,
    updateSkills,
    addListItem,
    updateListItem,
    removeListItem,
    reorderList,
    updateTemplate,
    toggleDarkMode
  };
}
