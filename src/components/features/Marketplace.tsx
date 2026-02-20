import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MOCK_COLLABS } from '@/mock/data';

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export function Marketplace() {
    const [offers, setOffers] = useState(MOCK_COLLABS);

    const handleActivate = (id: string, to: string) => {
        toast.success(`Промокод для ${to} скопирован! 🎉`, {
            description: 'Перенаправляем в приложение...',
        });
        setOffers(offers.filter(o => o.id !== id));
    };

    return (
        <motion.div
            className="space-y-8 max-w-5xl mx-auto"
            variants={containerVariants as any}
            initial="hidden"
            animate="show"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-semibold flex items-center gap-3">
                        Маркетплейс
                        <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Для вас
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground mt-2">Эксклюзивные предложения на основе ваших подписок</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['Все', 'Стриминг', 'Музыка', 'Продуктивность', 'Фитнес'].map((tag, i) => (
                        <Badge
                            key={tag}
                            variant={i === 0 ? 'default' : 'outline'}
                            className={`whitespace-nowrap cursor-pointer text-sm py-1.5 px-3 ${i === 0 ? 'bg-primary' : ''}`}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <motion.div variants={itemVariants as any} key={offer.id} layout initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                        <Card className="hover:border-primary/50 transition-colors h-full flex flex-col group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />

                            <CardHeader className="pb-4 relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                                        <Tag className="w-3 h-3 mr-1" />
                                        Экономия {offer.saving}
                                    </Badge>
                                </div>

                                <div className="flex flex-col items-center py-4 bg-muted/30 rounded-2xl border border-border/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm p-2 rotate-[-5deg] transition-transform group-hover:rotate-0">
                                            <img src={offer.fromIcon} alt={offer.from} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                                        </div>
                                        <ArrowRight className="text-muted-foreground animate-pulse" />
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-md p-2 rotate-[5deg] scale-110 border-2 border-primary/20 transition-transform group-hover:rotate-0">
                                            <img src={offer.toIcon} alt={offer.to} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center text-center space-y-4 relative z-10">
                                <h3 className="font-semibold text-lg leading-tight">
                                    Отмени {offer.from} → получи {offer.freeMonths} {offer.freeMonths === 1 ? 'месяц' : 'месяца'} {offer.to} бесплатно
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Идеальная замена по лучшей цене
                                </p>
                                <div className="mt-auto w-full pt-4">
                                    <Button
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/25"
                                        onClick={() => handleActivate(offer.id, offer.to)}
                                    >
                                        <Gift className="w-4 h-4 mr-2" />
                                        Активировать
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
