import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CreditCard, TrendingUp, Users, Gift, X, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Notification = {
    id: string;
    type: 'payment' | 'price' | 'family' | 'promo';
    title: string;
    desc: string;
    time: string;
    read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', type: 'payment', title: 'Скоро списание', desc: 'Adobe CC — $54.99 через 2 дня', time: '2ч назад', read: false },
    { id: '2', type: 'price', title: 'Цена выросла', desc: 'Netflix повысил цену с $13.99 до $15.99', time: '5ч назад', read: false },
    { id: '3', type: 'family', title: 'Новый участник', desc: 'Жанна К. присоединилась к вашей семье Spotify', time: 'Вчера', read: false },
    { id: '4', type: 'promo', title: 'Новый промокод', desc: 'Canva Pro — 3 месяца бесплатно по коду SUBMAN', time: 'Вчера', read: true },
    { id: '5', type: 'payment', title: 'Скоро списание', desc: 'Netflix — $15.99 через 5 дней', time: '2 дня', read: true },
    { id: '6', type: 'family', title: 'Место освободилось', desc: 'В семье YouTube Premium появилось свободное место', time: '3 дня', read: true },
];

const typeConfig: Record<Notification['type'], { icon: typeof Bell; color: string; bg: string }> = {
    payment: { icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    price: { icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-500/10' },
    family: { icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    promo: { icon: Gift, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

type Props = {
    /** Callback when unread count changes (для Badge в Header) */
    onUnreadChange?: (count: number) => void;
};

export function NotificationsPopover({ onUnreadChange }: Props) {
    const [notifs, setNotifs] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const [isOpen, setIsOpen] = useState(false);

    const unread = notifs.filter(n => !n.read).length;

    const markAllRead = () => {
        const updated = notifs.map(n => ({ ...n, read: true }));
        setNotifs(updated);
        onUnreadChange?.(0);
    };

    const dismiss = (id: string) => {
        setNotifs(prev => prev.filter(n => n.id !== id));
    };

    const toggle = () => {
        if (!isOpen && unread > 0) {
            // Mark as read after opening
            setTimeout(() => {
                setNotifs(prev => prev.map(n => ({ ...n, read: true })));
                onUnreadChange?.(0);
            }, 1500);
        }
        setIsOpen(v => !v);
    };

    return (
        <div className="relative">
            {/* Bell trigger */}
            <Button
                variant="ghost"
                size="icon"
                className="relative group"
                onClick={toggle}
            >
                <Bell className={cn(
                    'h-5 w-5 transition-colors',
                    isOpen ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                )} />
                <AnimatePresence>
                    {unread > 0 && (
                        <motion.span
                            key="badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 border-2 border-background flex items-center justify-center"
                        >
                            <span className="text-[9px] font-bold text-white leading-none">{unread}</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-border bg-card shadow-2xl shadow-black/20 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">Уведомления</span>
                                    {unread > 0 && (
                                        <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">{unread}</Badge>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                    onClick={markAllRead}
                                >
                                    <CheckCheck className="w-3 h-3 mr-1" />
                                    Прочитать все
                                </Button>
                            </div>

                            {/* List */}
                            <div className="max-h-[360px] overflow-y-auto">
                                <AnimatePresence initial={false}>
                                    {notifs.map(n => {
                                        const cfg = typeConfig[n.type];
                                        const Icon = cfg.icon;
                                        return (
                                            <motion.div
                                                key={n.id}
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className={cn(
                                                    'flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 relative group transition-colors',
                                                    !n.read && 'bg-primary/[0.03]'
                                                )}>
                                                    {/* Unread dot */}
                                                    {!n.read && (
                                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                                                    )}
                                                    <div className={cn('p-2 rounded-xl shrink-0 mt-0.5', cfg.bg)}>
                                                        <Icon className={cn('w-3.5 h-3.5', cfg.color)} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm font-medium truncate">{n.title}</p>
                                                            <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.desc}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => dismiss(n.id)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5 text-muted-foreground hover:text-foreground"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {notifs.length === 0 && (
                                    <div className="py-12 text-center text-muted-foreground">
                                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">Нет уведомлений</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
