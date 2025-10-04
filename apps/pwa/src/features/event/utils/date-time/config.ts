import { DateFormatOptions, DateTimeConfig, TimeFormatOptions } from "./types";
import { Locale } from "@/types/common";

export const DateTimeConfigEn: DateTimeConfig = {
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ],
};

export const DateTimeConfigUk: DateTimeConfig = {
    weekdays: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
    months: [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
    ],
};

export const DateFormatMessages: Record<Locale, DateFormatOptions> = {
    en: {
        today: "Today",
        tomorrow: "Tomorrow",
        dateFormat: ({ weekday, month, day }) => {
            return `${weekday}, ${month} ${day}`;
        },
        shortDateFormat: ({ month, day }) => {
            return `${month.slice(0, 3)} ${day}`;
        },
    },
    uk: {
        today: "Сьогодні",
        tomorrow: "Завтра",
        dateFormat: ({ weekday, month, day }) => {
            return `${weekday}, ${day} ${month}`;
        },
        shortDateFormat: ({ month, day }) => {
            return `${day} ${month.slice(0, 3)}`;
        },
    },
};
export const TimeFormatMessages: Record<Locale, TimeFormatOptions> = {
    en: {
        default: ({ hours, minutes }) => {
            const period = hours >= 12 ? "PM" : "AM";
            const hours12 = hours % 12 || 12;

            return `${hours12}:${minutes} ${period}`;
        },
    },
    uk: {
        default: ({ hours, minutes }) => {
            return `${hours}:${minutes}`;
        },
    },
};