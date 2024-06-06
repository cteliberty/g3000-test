import { TranslateRouteType } from "src/components/atoms/LanguageSwitcher";
import { TranslateSlugType } from "src/type/translateSlug";

const convertSlugToRoute = (pageSlug: TranslateSlugType[]) :TranslateRouteType[] => {
  const translateRoute:TranslateRouteType[] = [];

  pageSlug.map((slug) => {
    translateRoute.push({
      locale: slug.locale,
      route: `/${slug.slug}`,
    })
  })

  return translateRoute;
}

export default convertSlugToRoute;