import Head from 'next/head';
import { ImageProps } from 'next/image';
import { FC } from 'react';
import { getLocale } from 'next-intl/server';

import { performRequest } from '~lib/datocms';
import { responsiveImageFragment } from '~fragments/responsiveImageFragment';
import { TranslateRouteType } from '~atoms/LanguageSwitcher';

export type DefaultSeoType = {
  facebookPageUrl: string;
  fallbackSeo: Required<SeoType>;
  siteName: string;
  titleSuffix: string;
  twitterAccount: string;
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

export interface HeadSiteProps {
  seoPage?: SeoType;
  seoMore?: SeoMoreType;
  translateRout?: TranslateRouteType[];
}

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
    query SiteSetting($locale: SiteLocale) {
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

const HeadSite: FC<HeadSiteProps> = async (props) => {
  const { seoPage, seoMore, translateRout } = props;
  const useLocale = await getLocale();
  const defaultSetting = await querySiteSetting({ locale: useLocale });
  const { globalSeo } = defaultSetting;

  const defaultTranslateRout = translateRout?.find((element) => element.locale === 'en');

  const title = seoPage?.title ? seoPage.title : globalSeo.fallbackSeo.title;
  const description = seoPage?.description
    ? seoPage.description
    : globalSeo.fallbackSeo.description;
  const image = seoPage?.image ? seoPage.image : globalSeo.fallbackSeo.image;
  const imageSrc = typeof image.src === 'string' ? image.src : null;

  // globalSeo.fallbackSeo.noIndex = disable indexing on all website
  const noindex = globalSeo.fallbackSeo.noIndex ? true : seoPage?.noIndex ?? false;

  return (
    <Head>
      <title>{`${title} ${globalSeo.titleSuffix}`}</title>
      <link rel="icon" href={defaultSetting.favicon.url} />
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageSrc && <meta property="og:image" content={imageSrc} />}
      {noindex && <meta name="robots" content="noindex,nofollow"></meta>}
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`}
      ></link>

      {translateRout?.map((routeLocale, key) => {
        if (useLocale !== routeLocale.locale)
          return (
            <link
              key={`${key}-${routeLocale.locale}`}
              rel="alternate"
              hrefLang={routeLocale.locale}
              href={`${process.env.NEXT_PUBLIC_SITE_URL}${routeLocale.route}`}
            />
          );
      })}
      {defaultTranslateRout && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${defaultTranslateRout.route}`}
        />
      )}
      {seoMore?.canonicalLink !== '' && <link rel="canonical" href={seoMore?.canonicalLink} />}
    </Head>
  );
};

export default HeadSite;
