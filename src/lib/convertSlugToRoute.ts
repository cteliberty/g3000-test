import { TranslateRouteType } from '~atoms/LanguageSwitcher';
import { TranslateSlugType } from '~type/translateSlug';

const convertSlugToRoute = (pageSlug: TranslateSlugType[]): TranslateRouteType[] => {
  const translateRoute: TranslateRouteType[] = [];

  pageSlug.map((slug) => {
    translateRoute.push({
      locale: slug.locale,
      route: `/${slug.slug}`,
    });
  });

  return translateRoute;
};

export default convertSlugToRoute;
