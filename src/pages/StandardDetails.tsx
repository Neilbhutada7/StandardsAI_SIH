import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';

const StandardDetails = () => {
  const { id } = useParams();
  const { standards } = useStore();
  const standard = standards.find(s => s.id === id);

  if (!standard) return <div className="p-8">Standard not found.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">{standard.number}</h1>
        <p className="text-text-secondary">{standard.title}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="card !p-5">
          <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Standard Number</div>
          <div className="font-semibold text-lg">{standard.number}</div>
        </div>
        <div className="card !p-5">
          <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Edition</div>
          <div className="font-semibold text-lg">{standard.edition}</div>
        </div>
        <div className="card !p-5">
          <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Status</div>
          <div className={`badge ${standard.status === 'Current' ? 'success' : standard.status === 'Under Review' ? 'warning' : 'neutral'} text-sm mt-1`}>
            {standard.status}
          </div>
        </div>
        <div className="card !p-5">
          <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Sector</div>
          <div className="font-semibold text-lg">{standard.sector}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Scope</h2>
        </div>
        <p className="text-[0.95rem] text-text-secondary leading-relaxed">
          {standard.scope}
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Analysis Evidence</h2>
        </div>
        <div className="bg-primary border-l-4 border-border px-4 py-3 text-sm text-text-secondary italic">
          "{standard.evidenceExcerpt}"
        </div>
      </div>
    </div>
  );
};

export default StandardDetails;
