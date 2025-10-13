import { MetadataRoute } from "next";
import { BASE_URL } from "@/config/env.config";

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