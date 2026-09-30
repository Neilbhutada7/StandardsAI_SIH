import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, RefreshCw, FileText, XCircle, ChevronDown } from 'lucide-react';
import type { Analysis } from '../data/mockData';

const History = () => {
  const { analyses } = useStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'Pending' | 'Reviewed' | 'All'>('All');

  const filteredAnalyses = analyses.filter(a => {
    const matchesSearch = a.id.toLowerCase().includes(searchTerm.toLowerCase()) || a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || a.reviewStatus === activeTab;
    return matchesSearch && matchesTab;
  });

  const pendingCount = analyses.filter(a => a.reviewStatus === 'Pending').length;
  const reviewedCount = analyses.filter(a => a.reviewStatus === 'Reviewed').length;
  const totalCount = analyses.length;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] -m-4 md:-m-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-900">Analysis Queue</h1>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 md:gap-6">
          <button 
            onClick={() => setActiveTab('All')}
            className={`text-[14px] font-medium transition-colors ${activeTab === 'All' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Analyses <span className="ml-1 text-gray-400">· {totalCount}</span>
          </button>
          <button 
            onClick={() => setActiveTab('Pending')}
            className={`text-[14px] font-medium transition-colors ${activeTab === 'Pending' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending Review <span className="ml-1 text-gray-400">· {pendingCount}</span>
          </button>
          <button 
            onClick={() => setActiveTab('Reviewed')}
            className={`text-[14px] font-medium transition-colors ${activeTab === 'Reviewed' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed Reports <span className="ml-1 text-gray-400">· {reviewedCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search.." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            Sort by <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredAnalyses.map((analysis) => (
          <AnalysisCard key={analysis.id} analysis={analysis} onNavigate={() => navigate(`/analysis/${analysis.id}`)} />
        ))}
        {filteredAnalyses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 text-[14px]">
            No analyses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

// Subcomponent for the Card
const AnalysisCard = ({ analysis, onNavigate }: { analysis: Analysis, onNavigate: () => void }) => {
  const isPending = analysis.reviewStatus === 'Pending';
  
  return (
    <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[14px] font-semibold text-gray-900">ID: #{analysis.id.split('-')[1] || analysis.id}</span>
        <button 
          onClick={onNavigate}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="View Analysis"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-400">Category:</span>
          <span className="text-[13px] font-medium text-gray-900">{analysis.category}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-400">Status:</span>
          <span className={`text-[12px] font-semibold px-2 py-0.5 rounded ${
            isPending ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
          }`}>
            {isPending ? 'Review Required' : 'Completed'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-400">Assignee:</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
              PO
            </div>
            <span className="text-[13px] font-medium text-gray-900">Procurement Off.</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-100 mb-4"></div>

      {/* Attachments Section */}
      <div className="mt-auto">
        <span className="text-[12px] text-gray-400 mb-3 block">Attachments:</span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FileText size={24} className="text-gray-400 stroke-[1.5]" />
              {isPending && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                  <XCircle size={12} className="text-red-500 fill-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-gray-900 leading-tight">
                Spec_{analysis.category.substring(0, 3).toUpperCase()}.pdf
              </span>
              <span className="text-[11px] text-gray-400">PDF · 1.2 MB</span>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
