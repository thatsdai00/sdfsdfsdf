// Visitor logging utility that sends data directly to Discord webhook
export interface VisitorData {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    timestamp: string;
}

export class VisitorLogger {
    private static readonly WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    static async logVisit(): Promise<boolean> {
        try {
            const visitorData: VisitorData = {
                userAgent: navigator.userAgent,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                timestamp: new Date().toISOString()
            };

            // Create Discord embed
            const discordPayload = {
                embeds: [{
                    title: '🔔 New Site Visitor',
                    color: 0x5865F2,
                    fields: [
                        {
                            name: '⏰ Time',
                            value: new Date(visitorData.timestamp).toLocaleString(),
                            inline: true
                        },
                        {
                            name: '📱 Screen Resolution',
                            value: `${visitorData.screenWidth}x${visitorData.screenHeight}`,
                            inline: true
                        },
                        {
                            name: '🖥️ User Agent',
                            value: visitorData.userAgent.length > 1024
                                ? visitorData.userAgent.substring(0, 1021) + '...'
                                : visitorData.userAgent,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            const response = await fetch(this.WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordPayload)
            });

            return response.ok;
        } catch (error) {
            console.error('Failed to log visit:', error);
            return false;
        }
    }
}

// Visitor tracking utility
export class VisitorTracker {
    private static readonly STORAGE_KEY = 'visitor_tracked';
    private static readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

    static shouldTrackVisitor(): boolean {
        const lastTracked = localStorage.getItem(this.STORAGE_KEY);
        if (!lastTracked) return true;

        const lastTrackedTime = parseInt(lastTracked);
        const now = Date.now();

        // Track again if more than 30 minutes have passed
        return (now - lastTrackedTime) > this.SESSION_DURATION;
    }

    static markVisitorTracked(): void {
        localStorage.setItem(this.STORAGE_KEY, Date.now().toString());
    }

    static getVisitorInfo(): VisitorInfo {
        return {
            timestamp: new Date().toLocaleString('tr-TR', {
                timeZone: 'Europe/Istanbul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            userAgent: navigator.userAgent,
            language: navigator.language || 'Bilinmiyor',
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer
        };
    }
}