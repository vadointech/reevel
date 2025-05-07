export function hexToRgba(hex: string, a: number = 1): string {

    // Convert the first 2 characters to hexadecimal
    const r = parseInt(hex.substring(1, 3), 16),

        // Convert the middle 2 characters to hexadecimal
        g = parseInt(hex.substring(3, 5), 16),

        // Convert the last 2 characters to hexadecimal
        b = parseInt(hex.substring(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}