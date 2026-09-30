import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { BookX } from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const { standards } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStandards = standards.filter(s => {
    const matchesSearch = s.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.scope.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || s.sector === categoryFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Standards Library</h1>
        <p className="text-text-secondary">Searchable catalogue of Indian Standards in the knowledge base.</p>
      </div>

      <div className="card">
        <div className="flex flex-col gap-4 mb-4">
          <input 
            type="text" 
            className="input w-full" 
            placeholder="Search standards by number, title, product, scope..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search standards"
          />
          <div className="flex flex-wrap gap-2">
            <select className="select w-auto" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} aria-label="Category">
              <option value="All">Category: All</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil/Construction">Civil/Construction</option>
              <option value="PPE">PPE</option>
              <option value="Chemical">Chemical</option>
            </select>
            <select className="select w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Status">
              <option value="All">Status: All</option>
              <option value="Current">Current</option>
              <option value="Under Review">Under Review</option>
              <option value="Historical">Historical</option>
            </select>
          </div>
        </div>

        {filteredStandards.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Standard</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Edition</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStandards.map(s => (
                  <tr key={s.id} onClick={() => navigate(`/standards/${s.id}`)} className="cursor-pointer">
                    <td className="font-medium text-accent hover:underline whitespace-nowrap">{s.number}</td>
                    <td>{s.title}</td>
                    <td>{s.sector}</td>
                    <td>{s.edition}</td>
                    <td>
                      <span className={`badge ${s.status === 'Current' ? 'success' : s.status === 'Under Review' ? 'warning' : 'neutral'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <BookX size={48} className="text-border mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No standards found</h3>
            <p className="text-text-secondary text-sm">Your search did not match any records in the local demonstration database.</p>
            <button className="btn btn-secondary mt-4" onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setStatusFilter('All'); }}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
