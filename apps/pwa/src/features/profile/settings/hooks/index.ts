import { useState } from "react";

export type NotificationSettings = {
    blocked: boolean;
    recommendations: boolean;
    expiredNotification: boolean;
}

export const useNotificationDrawer = () => {
    const [settings, setSettings] = useState<NotificationSettings>({
        blocked: false,
        recommendations: false,
        expiredNotification: false
    });

    const handleSettingChange = (key: keyof NotificationSettings, value: boolean) => {
        let newSettings: NotificationSettings;

        if (key === 'blocked' && value) {
            newSettings = {
                blocked: true,
                recommendations: false,
                expiredNotification: false
            };
        } else {
            newSettings = { ...settings, [key]: value };
        }

        setSettings(newSettings);
    };

    return {
        settings,
        handleSettingChange
    }
}