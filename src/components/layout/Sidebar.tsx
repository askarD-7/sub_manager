import { Home, Users, Briefcase, Gift, Settings2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type SidebarProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const navItems = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'family', label: 'Семья', icon: Users },
    { id: 'b2b', label: 'Бизнес', icon: Briefcase },
    { id: 'marketplace', label: 'Маркетплейс', icon: Gift },
    { id: 'settings', label: 'Профиль', icon: Settings2 },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-16 items-center flex-shrink-0 px-6 font-display font-bold text-xl tracking-tight text-primary">
                    SubManager<span className="text-foreground">.io</span>
                </div>

                <nav className="flex-1 space-y-2 px-4 py-8 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? 'bg-primary/10 text-primary border-l-2 border-primary translate-x-1 outline-none'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground outline-none'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground"} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <button
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-left"
                        onClick={() => { setActiveTab('settings'); setIsOpen(false); }}
                    >
                        <Avatar className="h-9 w-9 border border-primary/20">
                            <AvatarImage src="" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">Askar</span>
                            <span className="text-xs text-muted-foreground">Pro Plan</span>
                        </div>
                        <Settings2 className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                </div>
            </aside>
        </>
    );
}
