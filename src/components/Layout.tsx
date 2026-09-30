import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  History, 
  BookOpen, 
  FileText, 
  Settings,
  Bell,
  User,
  Menu
} from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return 'Dashboard';
    if (location.pathname.includes('/analysis/new')) return 'New Analysis';
    if (location.pathname.includes('/analysis/process')) return 'Processing Analysis';
    if (location.pathname.includes('/analysis/results') || location.pathname.includes('/analysis/ANA')) return 'Analysis Results';
    if (location.pathname.includes('/standards')) return 'Standard Details';
    if (location.pathname.includes('/history')) return 'Analysis History';
    if (location.pathname.includes('/library')) return 'Standards Library';
    if (location.pathname.includes('/settings')) return 'Settings';
    if (location.pathname.includes('/analysis/review')) return 'Recommendation Review';
    if (location.pathname.includes('/analysis/report')) return 'Procurement Standards Report';
    if (location.pathname.includes('/relationships')) return 'Standards Relationship Map';
    return 'StandardsAI';
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-primary-900 text-white transition-all duration-300 ${sidebarExpanded ? 'w-sidebar' : 'w-sidebar-collapsed md:w-sidebar'} md:w-sidebar group`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="flex flex-col items-start justify-center h-header px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <Menu className="md:hidden cursor-pointer shrink-0" onClick={() => setSidebarExpanded(!sidebarExpanded)} />
            <div className={`font-bold text-xl truncate ${sidebarExpanded ? 'block' : 'hidden md:block'}`}>StandardsAI</div>
          </div>
          <div className={`text-[0.7rem] text-slate-400 mt-1 truncate ${sidebarExpanded ? 'block' : 'hidden md:block'}`}>AI-Powered Indian Standards</div>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
          <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors ${isActive ? 'bg-white/10 text-white' : ''}`}>
            <LayoutDashboard size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>Dashboard</span>
          </NavLink>
          <NavLink to="/analysis/new" className={() => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors ${location.pathname.includes('/analysis') ? 'bg-white/10 text-white' : ''}`}>
            <FileSearch size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>New Analysis</span>
          </NavLink>
          <NavLink to="/history" className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors ${isActive ? 'bg-white/10 text-white' : ''}`}>
            <History size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>Analysis History</span>
          </NavLink>
          <NavLink to="/library" className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors ${isActive || location.pathname.includes('/standards') ? 'bg-white/10 text-white' : ''}`}>
            <BookOpen size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>Standards Library</span>
          </NavLink>
          <NavLink to="/history" className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer`}>
            <FileText size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>Reports</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors ${isActive ? 'bg-white/10 text-white' : ''}`}>
            <Settings size={20} className="shrink-0" /> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>Settings</span>
          </NavLink>
        </div>

        <div className="p-4 border-t border-white/10 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div> <span className={`${sidebarExpanded ? 'block' : 'hidden md:block'} truncate`}>System Online</span>
          </div>
          <div className={`flex flex-col ${sidebarExpanded ? 'block' : 'hidden md:block'}`}>
            <span className="text-white font-semibold truncate">Procurement Officer</span>
            <span className="truncate">Government Procurement</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-sidebar ml-sidebar-collapsed transition-all duration-300 min-h-screen">
        <header className="h-header bg-secondary border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shrink-0 print:hidden">
          <div className="text-lg font-semibold text-text-primary">{getPageTitle()}</div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="btn btn-secondary p-2" aria-label="Notifications"><Bell size={18} /></button>
            <button className="btn btn-secondary p-2" aria-label="User Profile"><User size={18} /></button>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-20 print:p-0 print:pb-0">
          <Outlet />
        </main>
        
        {/* Global Disclaimer Footer */}
        <footer className="fixed bottom-0 left-sidebar-collapsed md:left-sidebar right-0 bg-primary/90 backdrop-blur-sm border-t border-border p-2 text-center text-xs text-text-muted z-10 print:hidden">
          Recommendations are AI-assisted and must be verified by an authorized technical/procurement professional before use in a tender specification.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
