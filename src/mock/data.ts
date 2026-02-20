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

export type CollabOffer = {
    id: string;
    from: string;
    to: string;
    saving: string;
    freeMonths: number;
    fromIcon: string;
    toIcon: string;
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
    { id: '1', name: "Netflix", price: 15.99, lastUsed: "45 дней назад", isUnused: true, nextPayment: "2025-06-03", icon: "https://logo.clearbit.com/netflix.com", color: "bg-red-500" },
    { id: '2', name: "ChatGPT Plus", price: 20.00, lastUsed: "Сегодня", isUnused: false, nextPayment: "2025-06-10", icon: "https://logo.clearbit.com/openai.com", color: "bg-emerald-500" },
    { id: '3', name: "Notion", price: 8.00, lastUsed: "12 дней назад", isUnused: false, nextPayment: "2025-06-15", icon: "https://logo.clearbit.com/notion.so", color: "bg-stone-800" },
    { id: '4', name: "Adobe CC", price: 54.99, lastUsed: "67 дней назад", isUnused: true, nextPayment: "2025-06-01", icon: "https://logo.clearbit.com/adobe.com", color: "bg-red-600" },
    { id: '5', name: "Duolingo Plus", price: 6.99, lastUsed: "90 дней назад", isUnused: true, nextPayment: "2025-06-05", icon: "https://logo.clearbit.com/duolingo.com", color: "bg-green-500" },
];

export const MOCK_FAMILIES: FamilyPlan[] = [
    { id: '1', service: "Spotify", owner: "Алина К.", slots: 6, used: 4, pricePerSlot: 2.50, icon: "https://logo.clearbit.com/spotify.com", isHot: false },
    { id: '2', service: "YouTube Premium", owner: "Дамир С.", slots: 5, used: 4, pricePerSlot: 3.00, icon: "https://logo.clearbit.com/youtube.com", isHot: true },
    { id: '3', service: "Apple One", owner: "Айгерим М.", slots: 6, used: 2, pricePerSlot: 4.17, icon: "https://logo.clearbit.com/apple.com", isHot: false },
];

export const MOCK_B2B_ALERTS: B2BAlert[] = [
    { id: '1', employee: "Максим Р.", tool: "Figma", daysInactive: 30, cost: 15, status: 'sleeping', avatar: "https://i.pravatar.cc/40?u=maksim" },
    { id: '2', employee: "Жанна К.", tool: "Slack Pro", daysInactive: 45, cost: 8.75, status: 'sleeping', avatar: "https://i.pravatar.cc/40?u=zhanna" },
    { id: '3', employee: "Иван П.", tool: "Notion", daysInactive: 60, cost: 8, status: "fired", avatar: "https://i.pravatar.cc/40?u=ivan" },
];

export const MOCK_COLLABS: CollabOffer[] = [
    { id: '1', from: "Netflix", to: "Okko", saving: "$5.99", freeMonths: 1, fromIcon: "https://logo.clearbit.com/netflix.com", toIcon: "https://logo.clearbit.com/okko.tv" },
    { id: '2', from: "Adobe CC", to: "Canva Pro", saving: "$54.99", freeMonths: 2, fromIcon: "https://logo.clearbit.com/adobe.com", toIcon: "https://logo.clearbit.com/canva.com" },
    { id: '3', from: "Spotify", to: "Yandex Music", saving: "$4.99", freeMonths: 3, fromIcon: "https://logo.clearbit.com/spotify.com", toIcon: "https://logo.clearbit.com/music.yandex.ru" },
];
