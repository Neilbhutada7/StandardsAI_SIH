import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewAnalysis from './pages/NewAnalysis';
import AnalysisProcess from './pages/AnalysisProcess';
import AnalysisResults from './pages/AnalysisResults';
import StandardDetails from './pages/StandardDetails';
import RelationshipGraph from './pages/RelationshipGraph';
import Review from './pages/Review';
import Report from './pages/Report';
import History from './pages/History';
import Library from './pages/Library';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analysis/new" element={<NewAnalysis />} />
          <Route path="analysis/process" element={<AnalysisProcess />} />
          <Route path="analysis/:id" element={<AnalysisResults />} />
          <Route path="analysis/:id/review" element={<Review />} />
          <Route path="analysis/:id/report" element={<Report />} />
          <Route path="standards/:id" element={<StandardDetails />} />
          <Route path="relationships" element={<RelationshipGraph />} />
          <Route path="history" element={<History />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
