export type DateTimeConfig = {
    weekdays: string[]
    months: string[]
};

export type DateFormatOptions = {
    today: string,
    tomorrow: string,
    dateFormat: (args: { weekday: string, month: string, day: string}) => string
};

export type TimeFormatOptions = {
    default: (args: { hours: number, minutes: string | number }) => string;
};