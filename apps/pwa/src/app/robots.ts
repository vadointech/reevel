import { MetadataRoute } from "next";
import { BASE_URL } from "@/auth.config";

export default function robots(): MetadataRoute.Robots {
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
                    "/profile/",
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}