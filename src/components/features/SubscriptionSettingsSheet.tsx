import { useState } from 'react';
import { XCircle, EyeOff } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Subscription } from '@/mock/data';

const CATEGORIES = ['Работа', 'Развлечения', 'Обучение', 'Фитнес', 'Другое'];

type Props = {
    sub: Subscription | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCancel: (id: string) => void;
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={cn(
                'relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none',
                checked ? 'bg-primary' : 'bg-muted'
            )}
        >
            <span className={cn(
                'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
                checked && 'translate-x-5'
            )} />
        </button>
    );
}

export function SubscriptionSettingsSheet({ sub, open, onOpenChange, onCancel }: Props) {
    const [category, setCategory] = useState('Развлечения');
    const [hidden, setHidden] = useState(false);
    const [confirmCancel, setConfirmCancel] = useState(false);

    const handleCancel = () => {
        if (!sub) return;
        if (!confirmCancel) {
            setConfirmCancel(true);
            return;
        }
        onCancel(sub.id);
        toast.success(`Подписка ${sub.name} отменена 🎉`, {
            description: `Вы сэкономили $${sub.price}/мес`,
        });
        onOpenChange(false);
        setConfirmCancel(false);
    };

    if (!sub) return null;

    return (
        <Sheet open={open} onOpenChange={(v) => { onOpenChange(v); setConfirmCancel(false); }}>
            <SheetContent side="right" className="w-full sm:max-w-md p-6 space-y-6 overflow-y-auto">
                <SheetHeader>
                    <div className="flex items-center gap-4">
                        <ServiceIcon name={sub.name} size={52} />
                        <div>
                            <SheetTitle className="text-xl">{sub.name}</SheetTitle>
                            <div className="text-muted-foreground font-mono">${sub.price}/мес</div>
                        </div>
                    </div>
                </SheetHeader>

                {/* Status */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border">
                    <div className={`w-2 h-2 rounded-full ${sub.isUnused ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                    <span className={`text-sm ${sub.isUnused ? 'text-yellow-500' : 'text-emerald-500'}`}>
                        {sub.isUnused ? `Неактивна: ${sub.lastUsed}` : `В норме: ${sub.lastUsed}`}
                    </span>
                </div>

                {/* Next payment */}
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Следующее списание</p>
                    <p className="font-medium">{sub.nextPayment}</p>
                </div>

                {/* Category */}
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Категория</p>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={cn(
                                    'px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all',
                                    category === cat
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/30'
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hide from stats */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="text-sm font-medium">Скрыть из статистики</div>
                            <div className="text-xs text-muted-foreground">Не учитывать при подсчёте трат</div>
                        </div>
                    </div>
                    <Toggle checked={hidden} onChange={setHidden} />
                </div>

                {/* Cancel button */}
                <div className="pt-2 space-y-2">
                    <Button
                        variant="destructive"
                        className={cn('w-full transition-all', confirmCancel && 'animate-pulse')}
                        onClick={handleCancel}
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        {confirmCancel ? 'Нажмите ещё раз для подтверждения' : 'Отменить подписку'}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full text-muted-foreground">
                            Закрыть
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
