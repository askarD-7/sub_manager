import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    User, CreditCard, Bell, Camera, Plus, Trash2,
    Check, ChevronRight, Shield, Mail, Phone, Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ─── Mock Data ─────────────────────────────────────────────────────────────

const MOCK_CARDS = [
    { id: '1', type: 'Visa', last4: '4242', expires: '08/27', isDefault: true },
    { id: '2', type: 'Mastercard', last4: '1337', expires: '12/25', isDefault: false },
];

const MOCK_TRANSACTIONS = [
    { id: '1', date: '20.02.2026', service: 'ChatGPT Plus', amount: '$20.00', status: 'success' as const },
    { id: '2', date: '15.02.2026', service: 'Notion', amount: '$8.00', status: 'success' as const },
    { id: '3', date: '03.02.2026', service: 'Adobe CC', amount: '$54.99', status: 'success' as const },
    { id: '4', date: '01.02.2026', service: 'Netflix', amount: '$15.99', status: 'failed' as const },
    { id: '5', date: '28.01.2026', service: 'ChatGPT Plus', amount: '$20.00', status: 'success' as const },
    { id: '6', date: '15.01.2026', service: 'Notion', amount: '$8.00', status: 'success' as const },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={cn(
                'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none',
                checked ? 'bg-primary' : 'bg-muted'
            )}
        >
            <span className={cn(
                'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
                checked && 'translate-x-5'
            )} />
        </button>
    );
}

function Field({
    label, value, placeholder, type = 'text', icon: Icon,
    onChange
}: {
    label: string; value: string; placeholder?: string; type?: string;
    icon?: typeof User; onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    className={cn(
                        'w-full h-10 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all',
                        Icon ? 'pl-9 pr-3' : 'px-3'
                    )}
                />
            </div>
        </div>
    );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function ProfileSection() {
    const [name, setName] = useState('Аскар Кенжебаев');
    const [email, setEmail] = useState('askar@example.com');
    const [phone, setPhone] = useState('+7 777 777 7777');
    const [currency, setCurrency] = useState('USD');
    const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?u=current_user');
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setAvatar(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        toast.success('Профиль сохранён!', { description: 'Данные успешно обновлены.' });
    };

    return (
        <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-2xl">АК</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                    >
                        <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
                <div>
                    <div className="font-semibold text-lg">{name}</div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary mt-1">Pro Plan</Badge>
                </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Имя" value={name} onChange={setName} icon={User} placeholder="Ваше имя" />
                <Field label="Email" value={email} onChange={setEmail} icon={Mail} type="email" />
                <Field label="Телефон" value={phone} onChange={setPhone} icon={Phone} />
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Валюта</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <select
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                            className="w-full h-10 rounded-lg border border-border bg-muted/30 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                        >
                            <option value="USD">USD — Доллар США</option>
                            <option value="EUR">EUR — Евро</option>
                            <option value="KZT">KZT — Тенге</option>
                            <option value="RUB">RUB — Рубль</option>
                        </select>
                    </div>
                </div>
            </div>

            <Button onClick={handleSave} className="w-full sm:w-auto shadow-lg shadow-primary/20">
                <Check className="w-4 h-4 mr-2" />
                Сохранить изменения
            </Button>
        </div>
    );
}

function BillingSection() {
    const [cards, setCards] = useState(MOCK_CARDS);
    const [showAddCard, setShowAddCard] = useState(false);

    const removeCard = (id: string) => {
        setCards(prev => prev.filter(c => c.id !== id));
        toast.success('Карта удалена');
    };

    const setDefault = (id: string) => {
        setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    };

    const addCard = () => {
        setShowAddCard(false);
        toast.success('Карта добавлена!', { description: 'Временная заглушка — интеграция с платёжным шлюзом.' });
    };

    return (
        <div className="space-y-8">
            {/* Current plan */}
            <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-5 flex items-center justify-between">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Текущий тариф</div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-display font-semibold">Pro Plan</span>
                            <Badge className="bg-primary/20 text-primary">$9.99/мес</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Следующее списание: 1 марта 2026</div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Изменить план</Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">Отменить</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Cards */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Методы оплаты</h3>
                    <Button size="sm" variant="outline" onClick={() => setShowAddCard(v => !v)}>
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        Добавить карту
                    </Button>
                </div>

                {showAddCard && (
                    <Card className="mb-3 border-primary/20">
                        <CardContent className="p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                    <label className="text-xs text-muted-foreground block mb-1">Номер карты</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full h-9 rounded-lg border border-border bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">Срок</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full h-9 rounded-lg border border-border bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="•••"
                                        className="w-full h-9 rounded-lg border border-border bg-muted/30 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={addCard}>Добавить</Button>
                                <Button size="sm" variant="ghost" onClick={() => setShowAddCard(false)}>Отмена</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-2">
                    {cards.map(card => (
                        <div key={card.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                            <div className={cn(
                                'w-10 h-7 rounded-md flex items-center justify-center text-[10px] font-bold',
                                card.type === 'Visa' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                            )}>
                                {card.type === 'Visa' ? 'VISA' : 'MC'}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">{card.type} •••• {card.last4}</div>
                                <div className="text-xs text-muted-foreground">Истекает {card.expires}</div>
                            </div>
                            {card.isDefault ? (
                                <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-500">По умолчанию</Badge>
                            ) : (
                                <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setDefault(card.id)}>
                                    Сделать основной
                                </Button>
                            )}
                            <button onClick={() => removeCard(card.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transactions */}
            <div>
                <h3 className="font-semibold mb-3">История транзакций</h3>
                <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Дата</th>
                                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Сервис</th>
                                <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Сумма</th>
                                <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Статус</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_TRANSACTIONS.map(tx => (
                                <tr key={tx.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-4 py-3 text-muted-foreground">{tx.date}</td>
                                    <td className="px-4 py-3 font-medium">{tx.service}</td>
                                    <td className="px-4 py-3 text-right font-mono">{tx.amount}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                'text-xs',
                                                tx.status === 'success'
                                                    ? 'bg-emerald-500/10 text-emerald-500'
                                                    : 'bg-red-500/10 text-red-500'
                                            )}
                                        >
                                            {tx.status === 'success' ? 'Успешно' : 'Ошибка'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

type AlertSetting = {
    id: string;
    label: string;
    desc: string;
    enabled: boolean;
    icon: typeof Bell;
    extra?: React.ReactNode;
};

function AlertsSection() {
    const [daysBefore, setDaysBefore] = useState('3');
    const [alerts, setAlerts] = useState<AlertSetting[]>([
        { id: 'payment', label: 'Предупреждать о списании', desc: `За ${3} дня до даты списания`, enabled: true, icon: CreditCard },
        { id: 'price', label: 'Рост цены сервиса', desc: 'Если подписка стала дороже', enabled: true, icon: ChevronRight },
        { id: 'family', label: 'Новый участник в семье', desc: 'Когда кто-то присоединяется', enabled: false, icon: Shield },
        { id: 'digest', label: 'Еженедельный email-дайджест', desc: 'Сводка трат каждое воскресенье', enabled: true, icon: Mail },
    ]);

    const toggle = (id: string) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    };

    const handleSave = () => {
        toast.success('Настройки алертов сохранены!');
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary/20 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                                <Bell className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <div className="font-medium text-sm">{alert.label}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{alert.desc}</div>
                                {/* Days selector for payment alert */}
                                {alert.id === 'payment' && alert.enabled && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-muted-foreground">За</span>
                                        <select
                                            value={daysBefore}
                                            onChange={e => setDaysBefore(e.target.value)}
                                            className="h-7 rounded border border-border bg-muted/40 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                        >
                                            <option value="1">1 день</option>
                                            <option value="2">2 дня</option>
                                            <option value="3">3 дня</option>
                                            <option value="7">7 дней</option>
                                        </select>
                                        <span className="text-xs text-muted-foreground">до списания</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Toggle checked={alert.enabled} onChange={() => toggle(alert.id)} />
                    </div>
                ))}
            </div>

            <Button onClick={handleSave} className="w-full sm:w-auto shadow-lg shadow-primary/20">
                <Check className="w-4 h-4 mr-2" />
                Сохранить настройки
            </Button>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const TABS = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'billing', label: 'Биллинг', icon: CreditCard },
    { id: 'alerts', label: 'Алерты', icon: Bell },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function ProfileSettings() {
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <motion.div
            className="max-w-3xl mx-auto space-y-6"
            variants={containerVariants as any}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVariants as any}>
                <h1 className="text-3xl font-display font-semibold">Настройки профиля</h1>
                <p className="text-muted-foreground mt-1">Управляйте своим аккаунтом и предпочтениями</p>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants as any} className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit border border-border">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const active = activeSection === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                active
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants as any}>
                <Card>
                    <CardContent className="p-6">
                        {activeSection === 'profile' && <ProfileSection />}
                        {activeSection === 'billing' && <BillingSection />}
                        {activeSection === 'alerts' && <AlertsSection />}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
