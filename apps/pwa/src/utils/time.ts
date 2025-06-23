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