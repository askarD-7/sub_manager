import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/features/Dashboard';
import { FamilySharing } from './components/features/FamilySharing';
import { B2BAudit } from './components/features/B2BAudit';
import { Marketplace } from './components/features/Marketplace';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'family':
        return <FamilySharing />;
      case 'b2b':
        return <B2BAudit />;
      case 'marketplace':
        return <Marketplace />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="h-full w-full">
        {renderContent()}
      </div>
    </AppLayout>
  );
}

export default App;
