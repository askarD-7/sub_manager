import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { MOCK_FAMILIES } from '@/mock/data';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { CreateFamilyModal } from '@/components/features/CreateFamilyModal';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";

type Family = typeof MOCK_FAMILIES[0] & { isJoined?: boolean };

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export function FamilySharing() {
    const [families, setFamilies] = useState<Family[]>(MOCK_FAMILIES);
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleCreated = (newFamily: Omit<Family, 'id'>) => {
        const id = `custom-${Date.now()}`;
        setFamilies(prev => [{ ...newFamily, id } as Family, ...prev]);
        toast.success(`Семья «${newFamily.service}» опубликована! 🎉`, {
            description: 'Теперь другие пользователи могут к вам присоединиться.',
        });
    };

    const handleJoinClick = (family: Family) => {
        setSelectedFamily(family);
        setIsSheetOpen(true);
    };

    const handleConfirmJoin = () => {
        if (!selectedFamily) return;

        toast.success(`Вы присоединились к семье Алины! 🎉`, {
            description: 'Доступ будет открыт в течение 5 минут.',
        });

        setFamilies(families.map((f) => {
            if (f.id === selectedFamily.id) return { ...f, used: f.used + 1, isJoined: true };
            return f;
        }));

        setIsSheetOpen(false);
        setSelectedFamily(null);
    };

    return (
        <motion.div
            className="space-y-6 max-w-4xl mx-auto pb-20"
            variants={containerVariants as any}
            initial="hidden"
            animate="show"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-semibold">Семейные подписки</h1>
                    <p className="text-muted-foreground mt-1">Делитесь подписками и платите меньше</p>
                </div>
                <Button className="font-medium hidden md:flex" size="sm" onClick={() => setIsCreateOpen(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Создать семью
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {families.map((family) => {
                    const isFull = family.used >= family.slots;
                    const isJoined = (family as any).isJoined;

                    return (
                        <motion.div variants={itemVariants as any} key={family.id} layout>
                            <Card className="hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col">
                                <CardHeader className="pb-4 border-b border-border/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ServiceIcon name={family.service} size={32} />
                                            <div>
                                                <CardTitle className="text-lg">{family.service}</CardTitle>
                                                <p className="text-xs text-muted-foreground">Владелец: {family.owner}</p>
                                            </div>
                                        </div>
                                        {family.isHot && !isJoined && (
                                            <Badge variant="destructive" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                                                <Flame className="w-3 h-3 mr-1" />
                                                Горячее
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4 flex-1">
                                    <div className="flex items-end justify-between mb-6">
                                        <div>
                                            <div className="text-3xl font-display font-semibold text-primary">
                                                ${family.pricePerSlot.toFixed(2)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">в месяц с человека</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center gap-1 justify-end mb-1">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-medium text-sm">
                                                    {family.used} / {family.slots}
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">занято мест</div>
                                        </div>
                                    </div>

                                    <div className="flex -space-x-2 mb-6">
                                        {Array.from({ length: family.used }).map((_, i) => (
                                            <Avatar key={i} className="border-2 border-card w-8 h-8">
                                                <AvatarImage src={`https://i.pravatar.cc/100?u=${family.id}_${i}`} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {Array.from({ length: family.slots - family.used }).map((_, i) => (
                                            <div key={`empty-${i}`} className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-card">
                                                <PlusCircle className="w-3 h-3 text-muted-foreground/50" />
                                            </div>
                                        ))}
                                    </div>

                                    {isJoined ? (
                                        <Button variant="secondary" className="w-full" disabled>
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Вы в семье
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full"
                                            disabled={isFull}
                                            onClick={() => handleJoinClick(family as any)}
                                        >
                                            {isFull ? 'Мест нет' : `Вступить за $${family.pricePerSlot.toFixed(2)}`}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Confirmation Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="bottom" className="sm:side-right sm:max-w-md rounded-t-3xl sm:rounded-l-3xl p-8">
                    {selectedFamily && (
                        <div className="space-y-8">
                            <SheetHeader className="text-left space-y-4">
                                <div className="flex items-center gap-4">
                                    <ServiceIcon name={selectedFamily.service} size={64} />
                                    <div>
                                        <SheetTitle className="text-2xl">{selectedFamily.service}</SheetTitle>
                                        <p className="text-muted-foreground">Владелец: {selectedFamily.owner}</p>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Участники</h4>
                                    <div className="flex -space-x-3">
                                        {Array.from({ length: selectedFamily.used }).map((_, i) => (
                                            <Avatar key={i} className="border-2 border-background w-10 h-10">
                                                <AvatarImage src={`https://i.pravatar.cc/100?u=${selectedFamily.id}_${i}`} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {Array.from({ length: selectedFamily.slots - selectedFamily.used }).map((_, i) => (
                                            <div key={`empty-${i}`} className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/50">
                                                <PlusCircle className="w-4 h-4 text-muted-foreground/50" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Ваша цена</p>
                                            <div className="text-3xl font-display font-semibold text-primary">
                                                ${selectedFamily.pricePerSlot.toFixed(2)}
                                                <span className="text-sm font-normal text-muted-foreground block">в месяц</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground mb-1">Свободно мест</p>
                                            <div className="text-xl font-medium">
                                                {selectedFamily.slots - selectedFamily.used} из {selectedFamily.slots}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Button
                                    className="w-full h-14 text-lg font-semibold shadow-xl shadow-primary/20"
                                    onClick={handleConfirmJoin}
                                >
                                    Подтвердить за ${selectedFamily.pricePerSlot.toFixed(2)}/мес
                                </Button>
                                <SheetClose asChild>
                                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                                        Отмена
                                    </Button>
                                </SheetClose>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Модалка создания семьи */}
            <CreateFamilyModal
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onCreated={handleCreated}
            />

            {/* FAB for mobile */}
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-primary/25 md:hidden"
                size="icon"
                onClick={() => setIsCreateOpen(true)}
            >
                <PlusCircle className="w-6 h-6" />
            </Button>
        </motion.div>
    );
}
