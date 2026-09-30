import { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Procurement Officer',
    role: 'Technical Specification Writer',
    department: 'Government Procurement Agency'
  });
  
  const [notifications, setNotifications] = useState({
    emailOnPending: true,
    weeklyReport: false
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-text-secondary">Manage your profile, preferences, and data sources.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">User Profile</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                className="input max-w-md" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input 
                type="text" 
                className="input max-w-md" 
                value={profile.role} 
                onChange={e => setProfile({...profile, role: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input 
                type="text" 
                className="input max-w-md" 
                value={profile.department} 
                onChange={e => setProfile({...profile, department: e.target.value})} 
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary">Save Profile</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Notification Preferences</h2>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-accent border-border rounded focus:ring-accent-light" 
                checked={notifications.emailOnPending}
                onChange={e => setNotifications({...notifications, emailOnPending: e.target.checked})}
              />
              <span className="text-sm font-medium">Email me when a new review is pending</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-accent border-border rounded focus:ring-accent-light" 
                checked={notifications.weeklyReport}
                onChange={e => setNotifications({...notifications, weeklyReport: e.target.checked})}
              />
              <span className="text-sm font-medium">Send weekly summary report</span>
            </label>
          </div>
        </div>

        <div className="card bg-status-info-bg border-status-info">
          <div className="card-header border-status-info/20">
            <h2 className="card-title text-status-info">Data Source Information</h2>
          </div>
          <div className="text-sm text-status-info">
            <p className="mb-4 font-medium">This prototype uses a local demonstration dataset. It is not connected to the live BIS standards database.</p>
            <p className="mb-4">The current local database contains 40 mock standards and 15 simulated analyses for demonstration purposes.</p>
            <div className="pt-4 border-t border-status-info/20">
              <button className="btn btn-secondary border-status-info text-status-info hover:bg-status-info hover:text-white transition-colors" disabled>
                Configure Authoritative Data Source (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
