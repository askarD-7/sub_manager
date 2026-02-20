import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationsPopover } from '@/components/features/NotificationsPopover';

type HeaderProps = {
    activeTab: string;
    setIsOpen: (open: boolean) => void;
    setActiveTab?: (tab: string) => void;
};

const mapTabToTitle: Record<string, string> = {
    dashboard: 'Дашборд',
    family: 'Семья',
    b2b: 'Команда',
    marketplace: 'Маркетплейс',
    settings: 'Профиль',
};

export function Header({ activeTab, setIsOpen, setActiveTab }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
                <h1 className="text-xl font-display font-semibold hidden sm:block">
                    {mapTabToTitle[activeTab] || 'Приложение'}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:flex items-center">
                    <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Поиск сервисов..."
                        className="h-9 w-64 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                <NotificationsPopover />

                <Avatar
                    className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                    onClick={() => setActiveTab?.('settings')}
                >
                    <AvatarImage src="https://i.pravatar.cc/150?u=current_user" />
                    <AvatarFallback>AK</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}

