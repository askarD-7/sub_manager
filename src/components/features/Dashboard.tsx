import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, CreditCard, Activity, ArrowRight, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MOCK_SUBSCRIPTIONS, MOCK_CALENDAR } from '@/mock/data';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { cn } from '@/lib/utils';
import { useCountUp } from '@/hooks/useCountUp';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function formatCalDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }).replace('.', '');
}

export function Dashboard() {
    const [subs, setSubs] = useState(MOCK_SUBSCRIPTIONS);
    const unusedTotal = subs.filter(s => s.isUnused).reduce((acc, curr) => acc + curr.price, 0);

    const spentMonthAnimated = useCountUp(147.90);
    const unusedTotalAnimated = useCountUp(unusedTotal);

    const handleCancel = (id: string, name: string, price: number) => {
        toast.success(`Подписка ${name} отменена 🎉`, {
            description: `Вы сэкономили $${price}/мес`,
        });
        setSubs(subs.filter(s => s.id !== id));
    };

    return (
        <motion.div
            className="space-y-8 max-w-6xl mx-auto"
            variants={containerVariants as any}
            initial="hidden"
            animate="show"
        >
            {/* Hero Section */}
            <motion.div variants={itemVariants as any} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-card to-card hover:border-primary/50 transition-colors border-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-muted-foreground font-medium flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            Траты за этот месяц
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-display font-medium mb-4 flex items-end gap-2">
                            ${spentMonthAnimated.toFixed(2)}
                            <span className="text-xl text-muted-foreground mb-1">/мес</span>
                        </div>

                        {unusedTotal > 0 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">
                                <Activity className="w-4 h-4" />
                                Из них ${unusedTotal.toFixed(2)} — за подписки, которыми вы не пользовались
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-muted-foreground font-medium text-sm flex items-center justify-between">
                            Потенциальная экономия
                            <TrendingDown className="w-5 h-5 text-emerald-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-display font-medium text-emerald-500">
                            ${unusedTotalAnimated.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Отмените неактивные сервисы сейчас
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Payment Calendar Strip */}
            <motion.div variants={itemVariants as any} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">Календарь платежей (ближайшие 7 дней)</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {MOCK_CALENDAR.map((cal) => (
                        <Card key={cal.id} className="min-w-[140px] flex-shrink-0 hover:border-primary/30 transition-colors">
                            <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                                <ServiceIcon name={cal.service} size={32} />
                                <div>
                                    <div className="font-semibold text-sm truncate w-full">{cal.service}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{formatCalDate(cal.date)}</div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "font-mono text-[10px] px-1.5 py-0",
                                        cal.isUnused ? "bg-red-500/20 text-red-400 border-red-500/20" : "bg-secondary text-muted-foreground"
                                    )}
                                >
                                    ${cal.amount}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>

            {/* Subs List */}
            <motion.div variants={itemVariants as any} className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Ваши подписки</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subs.map((sub) => (
                        <motion.div key={sub.id} layout initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                            <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg hover:shadow-primary/5 transition-all group">
                                <CardContent className="p-0 flex-1">
                                    <div className="p-5 flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <ServiceIcon name={sub.name} size={32} />
                                            <div>
                                                <h3 className="font-semibold text-lg">{sub.name}</h3>
                                                <div className="font-display font-medium text-muted-foreground">${sub.price}/мес</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className={`w-2 h-2 rounded-full ${sub.isUnused ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                                            <span className={`text-sm ${sub.isUnused ? 'text-yellow-500' : 'text-emerald-500'}`}>
                                                {sub.isUnused ? `Неактивна: ${sub.lastUsed}` : `В норме: ${sub.lastUsed}`}
                                            </span>
                                        </div>

                                        {sub.isUnused ? (
                                            <Button
                                                variant="destructive"
                                                className="w-full font-medium"
                                                onClick={() => handleCancel(sub.id, sub.name, sub.price)}
                                            >
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Отменить в 1 клик
                                            </Button>
                                        ) : (
                                            <Button variant="outline" className="w-full group-hover:bg-primary/5 transition-colors">
                                                Настройки
                                                <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
