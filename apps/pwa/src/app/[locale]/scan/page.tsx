import { QRCodeSVG } from "qrcode.react";
import styles from "./styles.module.scss";

export const dynamic = "force-static";
export const revalidate = false;

export default function Page() {
    return (
        <div className={styles.page}>
            <QRCodeSVG
                value={process.env.PWA_PUBLIC_URL!} // 👈 URL, який буде закодовано
                size={450}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
            />
        </div>
    );
}