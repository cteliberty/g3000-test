import { Metadata } from 'next';
import { ImageProps } from 'next/image';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { responsiveImageFragment } from '~fragments/responsiveImageFragment';
import { performRequest } from '~lib/datocms';
import { TranslateRouteType } from '~atoms/LanguageSwitcher';
import { locales } from '~source/navigation';

export type DefaultSeoType = {
  facebookPageUrl: string;
  fallbackSeo: Required<SeoType>;
  siteName: string;
  titleSuffix: string;
  twitterAccount: string;
};

export type PageSeoType = {
  seoPage?: SeoType;
  seoMore?: SeoMoreType;
};

export type SeoType = {
  title?: string;
  description?: string;
  image?: ImageProps;
  noIndex: boolean;
  twitterCard?: ImageProps;
};

export type SeoMoreType = {
  canonicalLink: string;
};

export type DefaultSiteSettingType = {
  globalSeo: DefaultSeoType;
  favicon: {
    url: string;
  };
  noIndex: boolean;
};

type queryType = {
  locale: string;
};
type DefaultSiteSettingProps = {
  data: {
    _site: DefaultSiteSettingType;
  };
};

const querySiteSetting = async (props: queryType): Promise<DefaultSiteSettingType> => {
  const { locale } = props;
  const PAGE_CONTENT_QUERY = `
    query SiteSettingQuery($locale: SiteLocale) {
      _site(locale: $locale) {
        globalSeo {
          facebookPageUrl
          fallbackSeo {
            twitterCard
            title
            noIndex
            description
            image {
              data: responsiveImage(imgixParams: {fit: max, w: "600", h: "315"}) {
                ...responsiveImageFragment
              }
            }
          }
          siteName
          titleSuffix
          twitterAccount
        }
        favicon {
          id
          url
          data: responsiveImage(imgixParams: {fit: max, w: "600", h: "315"}) {
            ...responsiveImageFragment
          }
        }
        noIndex
      }
    }
    ${responsiveImageFragment}
  `;

  const {
    data: { _site },
  }: DefaultSiteSettingProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });

  return _site;
};

export type getMetaDataProps = {
  locale: string;
  pageSeo: PageSeoType;
  translateRout?: TranslateRouteType[];
};

const getAlternateLinkDefault = () => {
  let alternateLink: Languages<URL> = {};
  locales.map((locale) => {
    alternateLink = {
      ...alternateLink,
      ...{
        [locale]: `/${locale}/`,
      },
    };
  });

  return alternateLink;
};

const getAlternateLink = (translateRout?: TranslateRouteType[]) => {
  let alternateLink: Languages<URL> = {};

  translateRout?.map((routeLocale) => {
    alternateLink = {
      ...alternateLink,
      ...{
        [routeLocale.locale]: routeLocale.route,
      },
    };
  });

  return translateRout ? alternateLink : getAlternateLinkDefault();
};

const getMetaData = async (props: getMetaDataProps): Promise<Metadata> => {
  const { locale, pageSeo, translateRout } = props;
  const { seoPage, seoMore } = pageSeo;

  const defaultSetting = await querySiteSetting({ locale: locale });
  const { globalSeo } = defaultSetting;

  const title = seoPage?.title ? seoPage.title : globalSeo.fallbackSeo.title;
  const description = seoPage?.description
    ? seoPage.description
    : globalSeo.fallbackSeo.description;
  const image = seoPage?.image ? seoPage.image : globalSeo.fallbackSeo.image;
  const imageSrc = typeof image.src === 'string' ? image.src : undefined;

  // globalSeo.fallbackSeo.noIndex = disable indexing on all website
  const noindex = globalSeo.fallbackSeo.noIndex ? true : seoPage?.noIndex ?? false;

  const noRobots: Robots = {
    index: false,
    follow: false,
  };

  const metadata: Metadata = {
    icons: defaultSetting.favicon.url,
    title: `${title} ${globalSeo.titleSuffix}`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: imageSrc,
      type: 'website',
    },

    robots: noindex ? noRobots : undefined,
    alternates: {
      languages: getAlternateLink(translateRout),
      canonical: seoMore?.canonicalLink,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageSrc && [imageSrc], // Must be an absolute URL
    },
  };

  return metadata;
};

export default getMetaData;
