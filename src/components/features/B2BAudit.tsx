import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, UserMinus, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { MOCK_B2B_ALERTS, MOCK_EMPLOYEES } from '@/mock/data';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { AnimatePresence } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export function B2BAudit() {
    const [alerts, setAlerts] = useState(MOCK_B2B_ALERTS);

    const totalWaste = alerts.reduce((acc, curr) => acc + curr.cost, 0);
    const inactiveCount = alerts.length;

    const handleDisable = (id: string, employee: string, tool: string, cost: number) => {
        toast.success(`Лицензия ${tool} для ${employee} отключена`, {
            description: `Бизнес сэкономил $${cost}/мес`,
        });
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const handleRemind = (employee: string) => {
        toast.info(`Уведомление отправлено ${employee}`, {
            description: 'Мы напомнили ему об использовании сервиса.',
        });
    };

    return (
        <motion.div
            className="space-y-8 max-w-5xl mx-auto"
            variants={containerVariants as any}
            initial="hidden"
            animate="show"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-display font-semibold">Аудит Лицензий (B2B)</h1>
                <p className="text-muted-foreground mt-1">Оптимизируйте расходы компании на SaaS-инструменты</p>
            </div>

            <motion.div variants={itemVariants as any} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground text-center">
                            Активных лицензий
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-display font-bold">24</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-yellow-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-500 text-center">
                            Неактивных / Уволенных
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-display font-bold text-yellow-500">{inactiveCount}</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-emerald-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-500 text-center">
                            Потенциальная экономия
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-display font-bold text-emerald-500">
                            ${totalWaste.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={itemVariants as any} className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Требуют внимания
                </h2>

                {alerts.length === 0 ? (
                    <Card className="border-dashed bg-transparent">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                            <CheckCircle2 className="w-12 h-12 mb-4 text-emerald-500 opacity-50" />
                            <p className="text-lg font-medium">Все лицензии оптимизированы!</p>
                            <p className="text-sm">Нет неактивных подписок, вы не переплачиваете.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                            {alerts.map((alert) => (
                                <motion.div
                                    key={alert.id}
                                    layout
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Card className={`border-2 ${alert.status === 'fired' ? 'border-red-500/30 bg-red-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border border-background">
                                                        <AvatarImage src={alert.avatar} />
                                                        <AvatarFallback>{alert.employee[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-base">{alert.employee}</CardTitle>
                                                        <CardDescription className="text-xs">
                                                            {alert.status === 'fired'
                                                                ? <span className="text-red-400 font-medium">Сотрудник уволен</span>
                                                                : <span className="text-yellow-400 font-medium">Спит {alert.daysInactive} дней</span>
                                                            }
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="font-mono bg-background">
                                                    ${alert.cost}/мес
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-sm mb-4 flex items-center gap-2">
                                                Инструмент:
                                                <ServiceIcon name={alert.tool} size={20} className="p-1 rounded-md bg-white/5" />
                                                <strong className="text-foreground">{alert.tool}</strong>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => handleDisable(alert.id, alert.employee, alert.tool, alert.cost)}
                                                >
                                                    <UserMinus className="w-4 h-4 mr-2" />
                                                    Отключить
                                                </Button>

                                                {alert.status === 'sleeping' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 bg-background"
                                                        onClick={() => handleRemind(alert.employee)}
                                                    >
                                                        Напомнить
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                <motion.div variants={itemVariants as any} className="space-y-4 pt-8">
                    <h2 className="text-lg font-semibold tracking-tight">Все сотрудники</h2>
                    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead className="w-[250px]">Сотрудник</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Инструмент</TableHead>
                                    <TableHead>Активность</TableHead>
                                    <TableHead className="text-right">Статус</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_EMPLOYEES.map((employee) => (
                                    <TableRow
                                        key={employee.id}
                                        className={`border-border/50 transition-colors ${employee.status === 'fired' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={employee.avatar} />
                                                    <AvatarFallback>{employee.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span>{employee.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className={employee.status === 'fired' ? 'line-through decoration-muted-foreground/50' : ''}>
                                            {employee.email}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <ServiceIcon name={employee.tool} size={20} className="p-1 rounded-md bg-white/5" />
                                                <span>{employee.tool}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {employee.lastActive}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {employee.status === 'active' && (
                                                <Badge className="bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 border-emerald-400/20 font-medium">Активен</Badge>
                                            )}
                                            {employee.status === 'inactive' && (
                                                <Badge className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 border-yellow-400/20 font-medium">Не активен</Badge>
                                            )}
                                            {employee.status === 'fired' && (
                                                <Badge className="bg-red-400/10 text-red-400 hover:bg-red-400/20 border-red-400/20 font-medium">Уволен</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
