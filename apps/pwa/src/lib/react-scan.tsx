export function ReactScan() {
    return (
        <script
            crossOrigin={"anonymous"}
            src={process.env.MODE === "DEV" ? "//unpkg.com/react-scan/dist/auto.global.js" : undefined}
        />
    );
}