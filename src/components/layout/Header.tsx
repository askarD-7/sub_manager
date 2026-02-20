import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type HeaderProps = {
    activeTab: string;
    setIsOpen: (open: boolean) => void;
};

const mapTabToTitle: Record<string, string> = {
    dashboard: 'Дашборд',
    family: 'Семья',
    b2b: 'Команда',
    marketplace: 'Маркетплейс',
};

export function Header({ activeTab, setIsOpen }: HeaderProps) {
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

                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
                </Button>

                <Avatar className="h-8 w-8 sm:hidden">
                    <AvatarImage src="https://i.pravatar.cc/150?u=current_user" />
                    <AvatarFallback>AK</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
