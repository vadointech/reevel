import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.PWA_PUBLIC_URL || "https://reevel.site";
  
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/scan",
                    "/login",
                    "/onboarding/",
                    "/calendar/",
                    "/event/",
                    "/profile",
                    "/profile/settings",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}