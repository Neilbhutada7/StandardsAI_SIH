import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { ReviewDecision } from '../data/mockData';

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { analyses, standards, updateReviewDecision } = useStore();
  
  const analysis = analyses.find(a => a.id === id);
  if (!analysis) return <div className="p-8">Analysis not found.</div>;

  const handleDecision = (recId: string, decision: string) => {
    updateReviewDecision(analysis.id, recId, decision === 'null' ? null : decision as ReviewDecision);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Recommendation Review</h1>
        <p className="text-text-secondary">Verify and approve AI-generated standards recommendations for {analysis.id}.</p>
      </div>

      <div className="card bg-status-info-bg border-status-info text-status-info mb-6 p-4 border rounded-md">
        <div className="font-semibold mb-2">Technical Review Required</div>
        <p className="text-sm">Recommendations are AI-assisted and should be verified by an authorized technical/procurement professional before inclusion in a final tender specification.</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Standard</th>
                <th>Title</th>
                <th>Relevance</th>
                <th>Relationship</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {analysis.recommendations.map(rec => {
                const std = standards.find(s => s.id === rec.standardId);
                if (!std) return null;
                return (
                  <tr key={rec.id}>
                    <td className="font-medium whitespace-nowrap">{std.number}</td>
                    <td className="truncate max-w-[200px]" title={std.title}>{std.title}</td>
                    <td>
                      <span className={`badge ${rec.relevance === 'High' ? 'success' : rec.relevance === 'Medium' ? 'warning' : 'neutral'}`}>
                        {rec.relevance}
                      </span>
                    </td>
                    <td>{rec.relationshipType}</td>
                    <td>
                      <select 
                        className="select py-1 px-2 text-sm w-32" 
                        value={rec.reviewerDecision || 'null'}
                        onChange={(e) => handleDecision(rec.id, e.target.value)}
                        aria-label={`Decision for ${std.number}`}
                      >
                        <option value="null">Pending</option>
                        <option value="Accept">✓ Accept</option>
                        <option value="Review">Review</option>
                        <option value="Reject">✕ Reject</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-end mt-6 pt-6 border-t border-border">
          <button className="btn btn-primary" onClick={() => navigate(`/analysis/${analysis.id}/report`)}>
            Generate Final Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
