import React, { useRef } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CVPreview } from './components/preview/CVPreview';
import { useCV } from './hooks/useCV';

function App() {
  const cvProps = useCV();
  const printRef = useRef(null);

  return (
    <div className="app">
      <Header 
        cvData={cvProps.cvData} 
        toggleDarkMode={cvProps.toggleDarkMode} 
        darkMode={cvProps.cvData.darkMode} 
        printRef={printRef}
      />
      <div className="app-workspace">
        <Sidebar cvProps={cvProps} />
        <CVPreview 
          cvData={cvProps.cvData} 
          updateTemplate={cvProps.updateTemplate} 
          printRef={printRef}
        />
      </div>
    </div>
  );
}

export default App;
