

export const formatTime = (hour: string, minute: string): string => {
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
};


export function formatDayMonth(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // або 'short' для короткої форми
    return `${day} ${month}`;
}

export function formatDate(date: Date, locale: string) {

    const formattedDate = new Date(date).toLocaleDateString(locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return `${formattedDate.trim()} • ${time}`;
}