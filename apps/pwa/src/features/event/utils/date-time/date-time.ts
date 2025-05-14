import { DateTimeConfigEn, DateTimeConfigUk, DateFormatMessages, TimeFormatMessages } from "./config";
import { DateTimeConfig } from "./types";
import { Locale } from "@/types/common";

class DateTime {
    format(date: Date | string, locale: Locale = "en") {
        const inputDate = date instanceof Date ? date : new Date(date);
        switch(locale) {
            case "en":
                return this.formatConfig(inputDate, locale, DateTimeConfigEn);
            case "uk":
                return this.formatConfig(inputDate, locale, DateTimeConfigUk);
        }
    }

    formatRelative(date: Date | string, locale: Locale = "en") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);

        if (compareDate.getTime() === today.getTime()) {
            return DateFormatMessages[locale].today;
        } else if (compareDate.getTime() === tomorrow.getTime()) {
            return DateFormatMessages[locale].tomorrow;
        } else {
            return this.format(date, locale);
        }
    }

    formatTime(time: Date | string, locale: Locale = "uk") {
        const timeObj = time instanceof Date ? time : new Date(time);

        const hours = timeObj.getHours();
        const minutes = timeObj.getMinutes();

        const formattedHours = hours.toString().padStart(2, "0");


        const formattedMinutes = minutes.toString().padStart(2, "0");

        return TimeFormatMessages[locale].default({
            hours: Number(formattedHours),
            minutes: formattedMinutes,
        });
    }

    private formatConfig(date: Date, locale: Locale, config: DateTimeConfig) {
        const weekday = config.weekdays[date.getDay()];
        const day = date.getDate();
        const month = config.months[date.getMonth()];

        return DateFormatMessages[locale].dateFormat({
            weekday,
            day: String(day),
            month,
        });
    }
}

export const dateTime = new DateTime();