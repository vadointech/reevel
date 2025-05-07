

export const formatTime = (hour: string, minute: string): string => {
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
};

export const formatDate = (month: string, date: string, fallback: string): string => {
    return month && date ? `${month} ${date}` : fallback;
};

export function formatDayMonth(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // або 'short' для короткої форми
    return `${day} ${month}`;
}