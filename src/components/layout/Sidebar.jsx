import React from 'react';
import { FormSection } from '../ui/FormSection';
import { PersonalInfoForm } from '../form/PersonalInfoForm';
import { SkillsForm } from '../form/SkillsForm';
import { ExperienceForm } from '../form/ExperienceForm';
import { EducationForm } from '../form/EducationForm';
import { ProjectsForm } from '../form/ProjectsForm';
import { ATSScorePanel } from '../ats/ATSScorePanel';

export function Sidebar({ cvProps }) {
  const { 
    cvData, 
    updatePersonalInfo, 
    updateSkills, 
    addListItem, 
    updateListItem, 
    removeListItem 
  } = cvProps;

  return (
    <div className="form-panel">
      <div className="form-panel-content">
        <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem' }}>Edit Resume</h2>
        
        <FormSection title="Personal Details" icon="👤">
          <PersonalInfoForm data={cvData.personalInfo} onChange={updatePersonalInfo} template={cvData.template} />
        </FormSection>

        <FormSection title="Skills" icon="⚡" defaultOpen={false}>
          <SkillsForm skills={cvData.skills} onChange={updateSkills} />
        </FormSection>

        <FormSection title="Work Experience" icon="💼" defaultOpen={false}>
          <ExperienceForm 
            experience={cvData.experience} 
            onAdd={(item) => addListItem('experience', item)} 
            onChange={(id, field, value) => updateListItem('experience', id, field, value)}
            onRemove={(id) => removeListItem('experience', id)}
          />
        </FormSection>

        <FormSection title="Education" icon="🎓" defaultOpen={false}>
          <EducationForm 
            education={cvData.education} 
            onAdd={(item) => addListItem('education', item)} 
            onChange={(id, field, value) => updateListItem('education', id, field, value)}
            onRemove={(id) => removeListItem('education', id)}
          />
        </FormSection>

        <FormSection title="Projects" icon="🚀" defaultOpen={false}>
          <ProjectsForm 
            projects={cvData.projects} 
            onAdd={(item) => addListItem('projects', item)} 
            onChange={(id, field, value) => updateListItem('projects', id, field, value)}
            onRemove={(id) => removeListItem('projects', id)}
          />
        </FormSection>
      </div>

      <div className="ats-panel">
        <ATSScorePanel cvData={cvData} />
      </div>
    </div>
  );
}
