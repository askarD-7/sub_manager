import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/ui/sonner';

type AppLayoutProps = {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export function AppLayout({ children, activeTab, setActiveTab }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex flex-1 flex-col overflow-hidden relative">
                <Header activeTab={activeTab} setIsOpen={setIsSidebarOpen} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 p-4 md:p-8">
                    {children}
                </main>
            </div>
            <Toaster theme="dark" position="bottom-right" richColors />
        </div>
    );
}
