import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { responsiveImageFragment } from '~fragments/responsiveImageFragment';
import { performRequest } from '~lib/datocms';
import getMetaData, { PageSeoType } from '~lib/getMetaDataDato';
import { seoQuery } from '~query/seoQuery';
import { PageContextType } from '~type/page';
import { SlugLocaleQueryType } from '~type/slugLocale';
import { TranslateRouteType } from '~atoms/LanguageSwitcher';
import Layout from '~template/layout';

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  };
};

type queryType = {
  locale: string;
  slug: string;
};

const queryRoute = async (props: queryType): Promise<TranslateRouteType[]> => {
  type PageSlugQueryRouteProps = {
    data: {
      contentPage?: SlugLocaleQueryType;
    };
  };

  const { locale, slug } = props;

  const translateRoute: TranslateRouteType[] = [];

  const PAGE_CONTENT_QUERY = `query ContentPageSlugQuery($slug: String, $locale: SiteLocale) {
    contentPage(locale: $locale, filter: {slug: {eq: $slug}}) {
      _allSlugLocales {
        locale
        value
      }
    }
  }`;

  const {
    data: { contentPage },
  }: PageSlugQueryRouteProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      slug: slug,
    },
  });

  if (!contentPage) notFound();
  const { _allSlugLocales } = contentPage;
  _allSlugLocales.map((slugLocales) => {
    translateRoute.push({
      locale: slugLocales.locale,
      route: `/page/${slugLocales.value}`,
    });
  });

  return translateRoute;
};

const queryData = async (props: queryType): Promise<PageSlugProps> => {
  type PageSlugQueryProps = {
    data: {
      contentPage: PageSlugProps;
    };
  };

  const { locale, slug } = props;
  const PAGE_CONTENT_QUERY = `query ContentPageQuery($slug: String, $locale: SiteLocale) {
    contentPage(locale: $locale, filter: {slug: {eq: $slug}}) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { contentPage },
  }: PageSlugQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      slug: slug,
    },
  });

  return contentPage;
};

const PageSlug: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
    slug: props.params.slug,
  };

  const pageSlug = await queryData(params);
  const t = await getTranslations('Index');

  return (
    <Layout translateRout={await queryRoute(params)}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export const generateMetadata = async (props: PageContextType) => {
  const params = {
    locale: props.params.locale,
    slug: props.params.slug,
  };

  type PageSlugSeoQuery = {
    data: {
      contentPage: PageSeoType;
    };
  };

  const PAGE_CONTENT_QUERY = `
    query ContentPageSEOQuery($slug: String, $locale: SiteLocale) {
    contentPage(locale: $locale, filter: {slug: {eq: $slug}}) {
        ${seoQuery}
      }
    }
    ${responsiveImageFragment}
  `;

  const {
    data: { contentPage },
  }: PageSlugSeoQuery = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: params,
  });

  return await getMetaData({
    locale: params.locale,
    pageSeo: contentPage,
    translateRout: await queryRoute(params),
  });
};

export default PageSlug;
