export type Subscription = {
    id: string;
    name: string;
    price: number;
    lastUsed: string;
    isUnused: boolean;
    nextPayment: string;
    icon: string;
    color: string;
};

export type FamilyPlan = {
    id: string;
    service: string;
    owner: string;
    slots: number;
    used: number;
    pricePerSlot: number;
    icon: string;
    isHot: boolean;
};

export type B2BAlert = {
    id: string;
    employee: string;
    tool: string;
    daysInactive: number;
    cost: number;
    status: 'active' | 'fired' | 'sleeping';
    avatar: string;
};

export type Employee = {
    id: string;
    name: string;
    email: string;
    tool: string;
    lastActive: string;
    status: 'active' | 'inactive' | 'fired';
    avatar: string;
};

export type CollabOffer = {
    id: string;
    from: string;
    to: string;
    saving: string;
    freeMonths: number;
    fromIcon: string;
    toIcon: string;
    category: string;
    promo?: string;
};

export type CalendarPayment = {
    id: string;
    service: string;
    date: string;
    amount: number;
    isUnused: boolean;
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
    { id: '1', name: "Netflix", price: 15.99, lastUsed: "45 дней назад", isUnused: true, nextPayment: "2025-06-03", icon: "https://logo.clearbit.com/netflix.com", color: "bg-red-500" },
    { id: '2', name: "ChatGPT Plus", price: 20.00, lastUsed: "Сегодня", isUnused: false, nextPayment: "2025-06-10", icon: "https://logo.clearbit.com/openai.com", color: "bg-emerald-500" },
    { id: '3', name: "Notion", price: 8.00, lastUsed: "12 дней назад", isUnused: false, nextPayment: "2025-06-15", icon: "https://logo.clearbit.com/notion.so", color: "bg-stone-800" },
    { id: '4', name: "Adobe CC", price: 54.99, lastUsed: "67 дней назад", isUnused: true, nextPayment: "2025-06-01", icon: "https://logo.clearbit.com/adobe.com", color: "bg-red-600" },
    { id: '5', name: "Duolingo Plus", price: 6.99, lastUsed: "90 дней назад", isUnused: true, nextPayment: "2025-06-05", icon: "https://logo.clearbit.com/duolingo.com", color: "bg-green-500" },
];

// TASK-09: Отдельные mock-данные для Календаря платежей
export const MOCK_CALENDAR: CalendarPayment[] = [
    { id: '1', service: "Adobe CC", date: "2025-06-01", amount: 54.99, isUnused: true },
    { id: '2', service: "Netflix", date: "2025-06-03", amount: 15.99, isUnused: true },
    { id: '3', service: "Duolingo Plus", date: "2025-06-05", amount: 6.99, isUnused: true },
    { id: '4', service: "ChatGPT Plus", date: "2025-06-10", amount: 20.00, isUnused: false },
    { id: '5', service: "Notion", date: "2025-06-15", amount: 8.00, isUnused: false },
];

export const MOCK_FAMILIES: FamilyPlan[] = [
    // Оригинальные 3
    { id: '1', service: "Spotify", owner: "Алина К.", slots: 6, used: 4, pricePerSlot: 2.50, icon: "https://logo.clearbit.com/spotify.com", isHot: false },
    { id: '2', service: "YouTube Premium", owner: "Дамир С.", slots: 5, used: 4, pricePerSlot: 3.00, icon: "https://logo.clearbit.com/youtube.com", isHot: true },
    { id: '3', service: "Apple One", owner: "Айгерим М.", slots: 6, used: 2, pricePerSlot: 4.17, icon: "https://logo.clearbit.com/apple.com", isHot: false },
    // TASK-10: 5 новых
    { id: '4', service: "ChatGPT Plus", owner: "Ержан А.", slots: 5, used: 2, pricePerSlot: 4.00, icon: "https://logo.clearbit.com/openai.com", isHot: false },
    { id: '5', service: "Adobe CC", owner: "Лаура М.", slots: 4, used: 3, pricePerSlot: 13.75, icon: "https://logo.clearbit.com/adobe.com", isHot: true },
    { id: '6', service: "GitHub", owner: "Тимур С.", slots: 6, used: 5, pricePerSlot: 1.67, icon: "https://logo.clearbit.com/github.com", isHot: true },
    { id: '7', service: "Notion", owner: "Карина Н.", slots: 4, used: 1, pricePerSlot: 2.00, icon: "https://logo.clearbit.com/notion.so", isHot: false },
    { id: '8', service: "Zoom", owner: "Асель Б.", slots: 5, used: 4, pricePerSlot: 3.00, icon: "https://logo.clearbit.com/zoom.us", isHot: true },
];

export const MOCK_B2B_ALERTS: B2BAlert[] = [
    { id: '1', employee: "Максим Р.", tool: "Figma", daysInactive: 30, cost: 15, status: 'sleeping', avatar: "https://i.pravatar.cc/40?u=maxim" },
    { id: '2', employee: "Жанна К.", tool: "Slack Pro", daysInactive: 45, cost: 8.75, status: 'sleeping', avatar: "https://i.pravatar.cc/40?u=zhanna" },
    { id: '3', employee: "Иван П.", tool: "Notion", daysInactive: 60, cost: 8, status: "fired", avatar: "https://i.pravatar.cc/40?u=ivan" },
];

// TASK-08B: Обновлённые сотрудники согласно ТЗ
export const MOCK_EMPLOYEES: Employee[] = [
    { id: '1', name: "Максим Р.", email: "m.rybakov@company.com", tool: "Figma", lastActive: "30 дней назад", status: 'inactive', avatar: "https://i.pravatar.cc/32?u=maxim" },
    { id: '2', name: "Жанна К.", email: "zh.k@company.com", tool: "Slack Pro", lastActive: "45 дней назад", status: 'inactive', avatar: "https://i.pravatar.cc/32?u=zhanna" },
    { id: '3', name: "Иван П.", email: "i.petrov@company.com", tool: "Notion", lastActive: "60 дней назад", status: 'fired', avatar: "https://i.pravatar.cc/32?u=ivan" },
    { id: '4', name: "Алия С.", email: "a.seitkali@company.com", tool: "GitHub", lastActive: "Сегодня", status: 'active', avatar: "https://i.pravatar.cc/32?u=aliya" },
    { id: '5', name: "Дамир Н.", email: "d.nurlan@company.com", tool: "Jira", lastActive: "2 дня назад", status: 'active', avatar: "https://i.pravatar.cc/32?u=damir" },
    { id: '6', name: "Светлана М.", email: "s.m@company.com", tool: "Zoom", lastActive: "5 дней назад", status: 'active', avatar: "https://i.pravatar.cc/32?u=sveta" },
    { id: '7', name: "Руслан Б.", email: "r.b@company.com", tool: "Linear", lastActive: "8 дней назад", status: 'active', avatar: "https://i.pravatar.cc/32?u=ruslan" },
];

export const MOCK_COLLABS: CollabOffer[] = [
    // Оригинальные 3 + promo (TASK-11)
    { id: '1', from: "Netflix", to: "Okko", saving: "$5.99", freeMonths: 1, fromIcon: "https://logo.clearbit.com/netflix.com", toIcon: "https://logo.clearbit.com/okko.tv", category: "Стриминг", promo: "SUBMAN-NFLX-A3F7" },
    { id: '2', from: "Adobe CC", to: "Canva Pro", saving: "$54.99", freeMonths: 2, fromIcon: "https://logo.clearbit.com/adobe.com", toIcon: "https://logo.clearbit.com/canva.com", category: "Продуктивность", promo: "SUBMAN-ADOB-X3R8" },
    { id: '3', from: "Spotify", to: "Yandex Music", saving: "$4.99", freeMonths: 3, fromIcon: "https://logo.clearbit.com/spotify.com", toIcon: "https://logo.clearbit.com/music.yandex.ru", category: "Музыка", promo: "SUBMAN-SPOT-C9D2" },
    // TASK-11: 5 новых офферов
    { id: '4', from: "Zoom", to: "Google Meet", saving: "$14.99", freeMonths: 1, fromIcon: "https://logo.clearbit.com/zoom.us", toIcon: "https://logo.clearbit.com/meet.google.com", category: "Продуктивность", promo: "SUBMAN-ZOOM-K2P9" },
    { id: '5', from: "GitHub", to: "GitLab", saving: "$4.00", freeMonths: 3, fromIcon: "https://logo.clearbit.com/github.com", toIcon: "https://logo.clearbit.com/gitlab.com", category: "Продуктивность", promo: "SUBMAN-GH-M7Q1" },
    { id: '6', from: "Adobe CC", to: "Figma", saving: "$29.99", freeMonths: 2, fromIcon: "https://logo.clearbit.com/adobe.com", toIcon: "https://logo.clearbit.com/figma.com", category: "Продуктивность", promo: "SUBMAN-ADOB-X3R8" },
    { id: '7', from: "Duolingo Plus", to: "Yandex Music", saving: "$6.99", freeMonths: 1, fromIcon: "https://logo.clearbit.com/duolingo.com", toIcon: "https://logo.clearbit.com/music.yandex.ru", category: "Музыка", promo: "SUBMAN-DUO-N5T2" },
    { id: '8', from: "Notion", to: "Linear", saving: "$8.00", freeMonths: 2, fromIcon: "https://logo.clearbit.com/notion.so", toIcon: "https://logo.clearbit.com/linear.app", category: "Продуктивность", promo: "SUBMAN-NOTI-B6W4" },
];
