// src/lib/service-icons.ts
export const SERVICE_ICONS: Record<string, string> = {
    // Dashboard
    "Netflix": "https://cdn.simpleicons.org/netflix",
    "ChatGPT Plus": "https://cdn.simpleicons.org/openai/ffffff",
    "Notion": "https://cdn.simpleicons.org/notion/ffffff",
    "Adobe CC": "https://cdn.simpleicons.org/adobe",
    "Duolingo Plus": "https://cdn.simpleicons.org/duolingo",

    // B2B
    "Figma": "https://cdn.simpleicons.org/figma",
    "Slack": "https://cdn.simpleicons.org/slack",
    "Slack Pro": "https://cdn.simpleicons.org/slack",
    "Jira": "https://cdn.simpleicons.org/jira",
    "GitHub": "https://cdn.simpleicons.org/github/ffffff",
    "Zoom": "https://cdn.simpleicons.org/zoom",
    "Linear": "https://cdn.simpleicons.org/linear/ffffff",

    // Family
    "Spotify": "https://cdn.simpleicons.org/spotify",
    "YouTube Premium": "https://cdn.simpleicons.org/youtube",
    "Apple One": "https://cdn.simpleicons.org/apple/ffffff",

    // Marketplace
    "Canva Pro": "https://cdn.simpleicons.org/canva",
    "Okko": "https://logo.clearbit.com/okko.tv",
    "Yandex Music": "https://logo.clearbit.com/music.yandex.ru",
    "Google Meet": "https://cdn.simpleicons.org/googlemeet",
    "GitLab": "https://cdn.simpleicons.org/gitlab",
};

export function getServiceIcon(name: string): string {
    return (
        SERVICE_ICONS[name] ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7B61FF&color=fff&size=64&bold=true&format=svg`
    );
}
