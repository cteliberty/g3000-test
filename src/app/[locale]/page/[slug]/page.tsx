import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { TranslateRouteType } from 'src/components/atoms/LanguageSwitcher';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { SlugLocaleQueryType } from 'src/type/slugLocale';

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  }
};

type PageSlugQueryProps = {
  data: {
    contentPage: PageSlugProps;
  };
}

type queryType = {
  locale: string;
  slug: string;
}

type PageSlugQueryRouteProps = {
  data: {
    contentPage?: SlugLocaleQueryType;
  };
}

const queryRoute = async (props:queryType) : Promise<TranslateRouteType[]> => {
  const {locale, slug} = props;

  const translateRoute:TranslateRouteType[] = [];

  const PAGE_CONTENT_QUERY = `query ContentPageSlugQuery($slug: String, $locale: SiteLocale) {
    contentPage(locale: $locale, filter: {slug: {eq: $slug}}) {
      _allSlugLocales {
        locale
        value
      }
    }
  }`;

  const {data:{ contentPage}}: PageSlugQueryRouteProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      slug: slug,
    }
  });

  if (!contentPage) notFound();
  const {_allSlugLocales} = contentPage;
  _allSlugLocales.map((slugLocales) => {
    translateRoute.push({
      locale: slugLocales.locale,
      route: `/page/${slugLocales.value}`,
    })
  })

  return translateRoute;
}

const queryData = async (props:queryType) : Promise<PageSlugProps> => {
  const {locale, slug} = props;
  const PAGE_CONTENT_QUERY = `query ContentPageQuery($slug: String, $locale: SiteLocale) {
    contentPage(locale: $locale, filter: {slug: {eq: $slug}}) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ contentPage }}: PageSlugQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      slug: slug,
    }
  });

  return contentPage;
}

const PageSlug: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
    slug: props.params.slug,
  }
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
}

export default PageSlug;