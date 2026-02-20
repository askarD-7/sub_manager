import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MOCK_COLLABS } from '@/mock/data';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Check, Copy } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function Marketplace() {
    const [filter, setFilter] = useState("Все");
    const [selectedOffer, setSelectedOffer] = useState<typeof MOCK_COLLABS[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredOffers = filter === "Все"
        ? MOCK_COLLABS
        : MOCK_COLLABS.filter(o => o.category === filter);

    const handleActivate = (offer: typeof MOCK_COLLABS[0]) => {
        setSelectedOffer(offer);
        setIsDialogOpen(true);
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success("Скопировано!", {
            icon: <Check className="w-4 h-4 text-emerald-500" />
        });
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
                    {['Все', 'Стриминг', 'Музыка', 'Продуктивность', 'Фитнес'].map((tag) => (
                        <Badge
                            key={tag}
                            variant={filter === tag ? 'default' : 'outline'}
                            className={`whitespace-nowrap cursor-pointer text-sm py-1.5 px-3 transition-all ${filter === tag ? 'bg-primary scale-105 shadow-md shadow-primary/20' : 'hover:bg-primary/10'
                                }`}
                            onClick={() => setFilter(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredOffers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
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
                                            <ServiceIcon name={offer.from} size={48} className="rotate-[-5deg] transition-transform group-hover:rotate-0 shadow-sm" />
                                            <ArrowRight size={20} className="text-gray-500" />
                                            <ServiceIcon name={offer.to} size={48} className="rotate-[5deg] scale-110 border-2 border-primary/20 transition-transform group-hover:rotate-0 shadow-md" />
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
                                            onClick={() => handleActivate(offer)}
                                        >
                                            <Gift className="w-4 h-4 mr-2" />
                                            Активировать
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Оффер активирован 🎉</DialogTitle>
                    </DialogHeader>
                    {selectedOffer && (
                        <div className="space-y-6 py-4">
                            <div className="flex justify-center items-center gap-6">
                                <ServiceIcon name={selectedOffer.from} size={48} className="opacity-50 grayscale" />
                                <ArrowRight className="text-muted-foreground" />
                                <ServiceIcon name={selectedOffer.to} size={64} className="scale-110 shadow-xl shadow-primary/20" />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground text-center">Используйте этот промокод при регистрации в {selectedOffer.to}:</p>
                                <div className="flex items-center gap-2 p-4 bg-muted rounded-xl border-2 border-dashed border-primary/20">
                                    <code className="flex-1 text-center font-mono text-lg font-bold tracking-wider">
                                        SUBMAN-{selectedOffer.to.toUpperCase()}-A3F7
                                    </code>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(`SUBMAN-${selectedOffer.to.toUpperCase()}-A3F7`)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button className="w-full h-12 text-lg font-medium" onClick={() => setIsDialogOpen(false)}>
                            Готово
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
