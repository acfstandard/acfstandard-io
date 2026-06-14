import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every path except:
  //  - /api/*, /_next/*, /_vercel/* (Next.js internals)
  //  - Static-file URLs ending in a known extension (sitemap.xml, robots.txt, fonts, images…).
  // IMPORTANT: the old pattern `.*\..*` excluded ANY path containing a dot, which
  // broke tool slugs like /tools/acf.advisor — those have to be routed through
  // next-intl, not skipped.
  matcher: [
    "/((?!api|_next|_vercel|.*\\.(?:html?|xml|txt|json|js|mjs|cjs|css|map|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|eot|pdf|zip)$).*)",
  ],
};
