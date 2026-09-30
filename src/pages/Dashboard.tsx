import { useNavigate } from 'react-router-dom';
import { FileSearch, Book, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { analyses } = useStore();
  
  const pendingReviews = analyses.filter(a => a.reviewStatus === 'Pending').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1 text-text-primary">Procurement Standards Intelligence</h1>
        <p className="text-text-secondary">Analyze procurement specifications and identify potentially applicable Indian Standards.</p>
        <div className="mt-4">
          <button className="btn btn-primary" onClick={() => navigate('/analysis/new')}>
            + New Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card !p-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Specifications Analyzed</div>
            <FileSearch size={20} className="text-text-muted" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-accent-900">128<span className="text-xs text-text-muted ml-2 font-normal">* Simulated aggregate</span></div>
        </div>
        <div className="card !p-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Standards in DB</div>
            <Book size={20} className="text-text-muted" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-accent-900">2,486<span className="text-xs text-text-muted ml-2 font-normal">* Simulated</span></div>
        </div>
        <div className="card !p-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Recommendations</div>
            <CheckCircle size={20} className="text-text-muted" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-accent-900">614<span className="text-xs text-text-muted ml-2 font-normal">* Simulated</span></div>
        </div>
        <div className="card !p-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Reviews Pending</div>
            <Clock size={20} className="text-text-muted" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-accent-900">{pendingReviews}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2 className="card-title">Recent Analyses</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Standards</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {analyses.slice(0, 5).map(analysis => (
                  <tr key={analysis.id} className="cursor-pointer" onClick={() => navigate(`/analysis/${analysis.id}`)}>
                    <td className="font-medium text-accent hover:underline">{analysis.id}</td>
                    <td>{analysis.category}</td>
                    <td>{analysis.recommendedStandardIds.length}</td>
                    <td>
                      <span className={`badge ${analysis.reviewStatus === 'Reviewed' ? 'success' : 'warning'}`}>
                        {analysis.reviewStatus}
                      </span>
                    </td>
                    <td>{new Date(analysis.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">System Overview</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Semantic Search</span>
                <span className="badge success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Knowledge Base</span>
                <span className="badge success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Relationship Graph</span>
                <span className="badge success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Explanation Engine</span>
                <span className="badge success">Operational</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn btn-secondary w-full justify-start" onClick={() => navigate('/analysis/new')}>Analyze Specification</button>
              <button className="btn btn-secondary w-full justify-start" onClick={() => navigate('/library')}>Browse Standards</button>
              <button className="btn btn-secondary w-full justify-start" onClick={() => navigate('/history')}>View Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
