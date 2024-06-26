import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from '~source/navigation';
export default createMiddleware({
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix,
  locales,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
