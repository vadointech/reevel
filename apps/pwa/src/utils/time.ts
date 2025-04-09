

export const formatTime = (hour: string, minute: string): string => {
    if (!hour) return "Start Date";
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
};

export const formatDate = (month: string, date: string, fallback: string): string => {
    return month && date ? `${month} ${date}` : fallback;
};