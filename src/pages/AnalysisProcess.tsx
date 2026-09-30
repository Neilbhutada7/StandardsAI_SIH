import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  'Document processed',
  'Technical requirements extracted',
  'Candidate standards retrieved',
  'Standards ranked',
  'Related standards analyzed',
  'Recommendation report generated'
];

const AnalysisProcess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [currentStep, setCurrentStep] = useState(0);
  const { analyses } = useStore();
  const analysis = analyses.find(a => a.id === id) || analyses[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => navigate(`/analysis/${analysis.id}`), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // Speed up slightly for demo
    return () => clearInterval(timer);
  }, [navigate, analysis.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Analyzing Specification</h1>
          <p className="text-text-secondary">Processing the input specification and identifying applicable standards.</p>
        </div>
        
        <div className="card">
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border bg-secondary shrink-0 ${isCompleted ? 'bg-status-success text-white border-status-success' : isActive ? 'border-accent-dark border-2' : 'border-border'}`}>
                    {isCompleted ? <Check size={14} aria-label="Completed" /> : (isActive ? <Loader2 size={14} className="animate-spin" aria-label="Processing" /> : null)}
                  </div>
                  <span className={`${isCompleted || isActive ? 'text-text-primary' : 'text-text-muted'} ${isActive ? 'font-medium' : ''}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {currentStep >= 1 && (
        <div className="animate-fade-in">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Extracted Requirements</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm text-text-muted">Category</div>
                <div className="font-medium">{analysis.category}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Technical Parameters Identified</div>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  {analysis.extractedRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AnalysisProcess;
