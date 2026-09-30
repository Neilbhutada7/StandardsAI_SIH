import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Analysis, Sector, Recommendation } from '../data/mockData';

const NewAnalysis = () => {
  const navigate = useNavigate();
  const { addAnalysis, standards } = useStore();
  const [activeTab, setActiveTab] = useState<'text' | 'upload'>('text');
  const [specText, setSpecText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'pump') {
      setSpecText("1. Scope: This specification covers the requirements for a centrifugal water pump intended for continuous industrial water circulation.\n2. Technical Requirements:\n- Flow rate: Minimum 50 cubic meters per hour.\n- Pressure: 4 bar operating pressure.\n- Material: Casing must be cast iron, impeller must be bronze or stainless steel.\n3. Testing: Must include hydrostatic pressure testing and performance curve verification.\n4. Safety: Must comply with general electrical safety for rotating machines.");
    } else {
      setSpecText('');
    }
  };

  const handleAnalyze = () => {
    // Generate a real ID and mock analysis result
    const newId = `ANA-00${Math.floor(Math.random() * 900) + 100}`;
    
    // Pick some realistic standards to recommend based on the text (dumb mock logic)
    const matchedStandards = standards.slice(0, 3);
    
    const recommendations: Recommendation[] = matchedStandards.map((std, idx) => ({
      id: `rec_new_${newId}_${idx}`,
      analysisId: newId,
      standardId: std.id,
      relevance: idx === 0 ? 'High' : 'Medium',
      reasons: ['Semantic content match', 'Technical parameter overlap'],
      relationshipType: idx === 0 ? 'Primary Product Standard' : 'Related Standard',
      reviewerDecision: null
    }));

    const newAnalysis: Analysis = {
      id: newId,
      specificationText: specText || 'Uploaded Document Content Mock',
      category: 'Mechanical' as Sector,
      extractedRequirements: ['Flow rate: Minimum 50 cubic meters per hour', 'Pressure: 4 bar operating pressure'],
      recommendedStandardIds: matchedStandards.map(s => s.id),
      reviewStatus: 'Pending',
      createdAt: new Date().toISOString(),
      recommendations
    };

    addAnalysis(newAnalysis);
    navigate(`/analysis/process?id=${newId}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid file format. Please upload PDF, DOCX, or TXT.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }
    
    // Simulate successful upload
    setSpecText(`[Content extracted from ${file.name}]`);
    setActiveTab('text');
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">New Specification Analysis</h1>
        <p className="text-text-secondary">Enter or upload a procurement specification to identify potentially applicable Indian Standards.</p>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <h2 className="text-lg font-semibold">Procurement Specification</h2>
          <select className="select w-auto" onChange={handleExampleSelect} defaultValue="" aria-label="Load example">
            <option value="" disabled>Load Example...</option>
            <option value="pump">Industrial Water Pump</option>
            <option value="cable">Electrical Cable</option>
            <option value="helmet">Safety Helmet</option>
            <option value="cement">Construction Material</option>
          </select>
        </div>

        <div className="flex border-b border-border mb-6">
          <button 
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:bg-primary ${activeTab === 'text' ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'}`} 
            onClick={() => setActiveTab('text')}
            aria-selected={activeTab === 'text'}
            role="tab"
          >
            Enter Specification
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:bg-primary ${activeTab === 'upload' ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'}`} 
            onClick={() => setActiveTab('upload')}
            aria-selected={activeTab === 'upload'}
            role="tab"
          >
            Upload Document
          </button>
        </div>

        {activeTab === 'text' ? (
          <div>
            <textarea 
              className="textarea min-h-[200px]" 
              placeholder="Enter the technical procurement specification here..."
              value={specText}
              onChange={(e) => setSpecText(e.target.value)}
              aria-label="Specification text"
            />
            <div className="text-sm text-text-muted mt-2 text-right">
              {specText.length} characters
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-md p-12 text-center bg-primary">
            <UploadCloud size={48} className="text-text-muted mx-auto mb-4" aria-hidden="true" />
            <h3 className="mb-2 font-medium text-text-primary">Upload procurement specification</h3>
            <p className="text-sm text-text-secondary mb-1">Supported formats: PDF, DOCX, TXT</p>
            <p className="text-sm text-text-secondary mb-4">Maximum size: 10 MB</p>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>Browse Files</button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" aria-label="File upload" />
            
            {uploadError && (
              <div className="mt-4 p-3 bg-status-error-bg text-status-error rounded-md border border-status-error/30 text-sm flex items-center justify-center gap-2" role="alert">
                <AlertCircle size={16} /> {uploadError}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border">
          <button className="btn btn-secondary" onClick={() => setSpecText('')}>Clear</button>
          <button className="btn btn-primary" onClick={handleAnalyze} disabled={!specText && activeTab === 'text'}>Analyze Specification</button>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysis;
