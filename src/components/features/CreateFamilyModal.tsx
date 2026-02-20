import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, PlusCircle, Users } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { cn } from '@/lib/utils';
import type { FamilyPlan } from '@/mock/data';

const SERVICES = [
    'Netflix', 'Spotify', 'YouTube Premium', 'Apple One',
    'ChatGPT Plus', 'Adobe CC', 'GitHub', 'Notion', 'Zoom',
    'Figma', 'Slack Pro', 'Duolingo Plus', 'Google Meet', 'Canva Pro',
];

const SLOT_OPTIONS = [
    { value: 2, label: '2', desc: 'Пара' },
    { value: 4, label: '4', desc: 'Семья' },
    { value: 6, label: '6', desc: 'Большая' },
];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated: (family: Omit<FamilyPlan, 'id'>) => void;
};

const slideVariants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: -dir * 60, opacity: 0 }),
};

export function CreateFamilyModal({ open, onOpenChange, onCreated }: Props) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [service, setService] = useState('');
    const [slots, setSlots] = useState(4);
    const [price, setPrice] = useState('');
    const [search, setSearch] = useState('');

    const filteredServices = SERVICES.filter(s =>
        s.toLowerCase().includes(search.toLowerCase())
    );

    const pricePerSlot = price && parseFloat(price) > 0
        ? (parseFloat(price) / slots).toFixed(2)
        : '—';

    const goNext = () => { setDirection(1); setStep(s => s + 1); };
    const goPrev = () => { setDirection(-1); setStep(s => s - 1); };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => { setStep(1); setService(''); setSlots(4); setPrice(''); setSearch(''); }, 300);
    };

    const handlePublish = () => {
        onCreated({
            service,
            owner: 'Аскар К.',
            slots,
            used: 1,
            pricePerSlot: parseFloat(pricePerSlot),
            icon: '',
            isHot: false,
        });
        handleClose();
    };

    const stepTitles = ['Выберите сервис', 'Настройте условия', 'Подтверждение'];

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl">{stepTitles[step - 1]}</DialogTitle>
                    <div className="flex gap-1.5 mt-1">
                        {[1, 2, 3].map(n => (
                            <div
                                key={n}
                                className={cn(
                                    'h-1 rounded-full flex-1 transition-all duration-300',
                                    n <= step ? 'bg-primary' : 'bg-muted'
                                )}
                            />
                        ))}
                    </div>
                </DialogHeader>

                <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                className="absolute inset-0 flex flex-col gap-3"
                            >
                                <input
                                    type="text"
                                    placeholder="Поиск сервиса..."
                                    value={search}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                                <div className="grid grid-cols-2 gap-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: 240 }}>
                                    {filteredServices.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setService(s)}
                                            className={cn(
                                                'flex items-center gap-2 p-2.5 rounded-xl border-2 text-left transition-all hover:border-primary/50',
                                                service === s
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border bg-card'
                                            )}
                                        >
                                            <ServiceIcon name={s} size={24} />
                                            <span className="text-sm font-medium truncate flex-1">{s}</span>
                                            {service === s && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                                <Button className="w-full" disabled={!service} onClick={goNext}>
                                    Далее <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                className="absolute inset-0 flex flex-col gap-5"
                            >
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                                    <ServiceIcon name={service} size={36} />
                                    <div>
                                        <div className="font-semibold">{service}</div>
                                        <div className="text-xs text-muted-foreground">Владелец: Аскар К.</div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium mb-2">Количество мест</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {SLOT_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setSlots(opt.value)}
                                                className={cn(
                                                    'flex flex-col items-center p-3 rounded-xl border-2 transition-all',
                                                    slots === opt.value
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-border hover:border-primary/40'
                                                )}
                                            >
                                                <Users className="w-4 h-4 mb-1" />
                                                <span className="text-lg font-bold">{opt.label}</span>
                                                <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-1.5">
                                        Полная стоимость подписки в месяц ($)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Например: 15.99"
                                        value={price}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    />
                                    {price && parseFloat(price) > 0 && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ≈ <span className="text-primary font-semibold">${pricePerSlot}</span> с человека в месяц
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Button variant="outline" className="flex-1" onClick={goPrev}>Назад</Button>
                                    <Button
                                        className="flex-1"
                                        disabled={!price || parseFloat(price) <= 0}
                                        onClick={goNext}
                                    >
                                        Далее <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                className="absolute inset-0 flex flex-col gap-5"
                            >
                                <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <ServiceIcon name={service} size={52} />
                                        <div>
                                            <div className="text-xl font-semibold">{service}</div>
                                            <div className="text-sm text-muted-foreground">Аскар К. • {slots} мест</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-background/60 rounded-xl p-3">
                                            <div className="text-[11px] text-muted-foreground mb-1">Цена / чел.</div>
                                            <div className="text-2xl font-display font-semibold text-primary">
                                                ${pricePerSlot}
                                                <span className="text-xs font-normal text-muted-foreground">/мес</span>
                                            </div>
                                        </div>
                                        <div className="bg-background/60 rounded-xl p-3">
                                            <div className="text-[11px] text-muted-foreground mb-1">Мест</div>
                                            <div className="text-2xl font-display font-semibold">{slots}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Button variant="outline" className="flex-1" onClick={goPrev}>Назад</Button>
                                    <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handlePublish}>
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        Опубликовать
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
