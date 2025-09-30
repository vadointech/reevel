import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: false,
    devIndicators: false,
    experimental: {
        serverActions: {
            bodySizeLimit: "3mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "artwizard.io",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/discover",
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
