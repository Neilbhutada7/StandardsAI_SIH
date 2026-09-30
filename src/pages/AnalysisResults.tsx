import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';

const AnalysisResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { analyses, standards } = useStore();
  
  const analysis = analyses.find(a => a.id === id);
  if (!analysis) return <div className="p-8">Analysis not found.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Standards Recommendation</h1>
        <p className="text-text-secondary">Potentially applicable Indian Standards identified from the submitted specification.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Specification Summary: {analysis.id}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <div className="text-sm text-text-muted">Category</div>
            <div className="font-semibold">{analysis.category}</div>
          </div>
          <div>
            <div className="text-sm text-text-muted">Requirements</div>
            <div className="font-semibold">{analysis.extractedRequirements.length}</div>
          </div>
          <div>
            <div className="text-sm text-text-muted">Standards analyzed</div>
            <div className="font-semibold">40</div>
          </div>
          <div>
            <div className="text-sm text-text-muted">Recommendations</div>
            <div className="font-semibold">{analysis.recommendations.length}</div>
          </div>
          <div className="col-span-2">
            <div className="text-sm text-text-muted">Review status</div>
            <div className={`font-semibold ${analysis.reviewStatus === 'Reviewed' ? 'text-status-success' : 'text-status-warning'}`}>
              {analysis.reviewStatus === 'Reviewed' ? 'Review Completed' : 'Pending Technical Review'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-xl font-semibold text-text-primary">Recommended Standards</h2>
        <button className="btn btn-secondary" onClick={() => navigate(`/analysis/${analysis.id}/review`)}>
          Review & Generate Report
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {analysis.recommendations.map(rec => {
          const standard = standards.find(s => s.id === rec.standardId);
          if (!standard) return null;
          
          return (
            <div key={rec.id} className="card !mb-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-1">{standard.number}</h3>
                  <div className="font-medium text-text-primary">{standard.title}</div>
                </div>
                <span className={`badge ${rec.relevance === 'High' ? 'success' : rec.relevance === 'Medium' ? 'warning' : 'neutral'}`}>
                  {rec.relevance} Relevance
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2 text-text-primary">Why this standard was identified</div>
                <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
                  {rec.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2 text-text-primary">Evidence</div>
                <div className="bg-primary border-l-4 border-border px-4 py-3 text-sm text-text-secondary italic">
                  "{standard.evidenceExcerpt}"
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 mt-4 border-t border-border gap-4">
                <div className="flex gap-4 text-sm text-text-muted">
                  <div><span className="font-semibold text-text-primary">Relationship:</span> {rec.relationshipType}</div>
                  <div><span className="font-semibold text-text-primary">Source:</span> Knowledge Base</div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button className="btn btn-secondary flex-1 md:flex-none" onClick={() => navigate(`/standards/${standard.id}`)}>View Details</button>
                  <button className="btn btn-secondary flex-1 md:flex-none" onClick={() => navigate(`/relationships`)}>View Relationships</button>
                  <button className="btn btn-primary flex-1 md:flex-none" onClick={() => navigate(`/analysis/${analysis.id}/review`)}>Add to Report</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisResults;
