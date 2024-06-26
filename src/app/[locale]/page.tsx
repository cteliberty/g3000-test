import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import getMetaData, { PageSeoType } from '~lib/getMetaDataDato';
import { seoQuery } from '~query/seoQuery';
import { responsiveImageFragment } from '~fragments/responsiveImageFragment';
import Layout from '~template/layout';

export type HomeProps = {
  hero: {
    subtitle?: string;
    title?: string;
    description?: string;
  }[];
};

type queryType = {
  locale: string;
};

const query = async (props: queryType): Promise<HomeProps> => {
  type HomeQueryProps = {
    data: {
      home: HomeProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query HomeQuery($locale: SiteLocale) {
    home(locale: $locale) {
      hero {
        title
        subtitle
        description
      }
    }
  }`;

  console.log(
    '==> home',
    locale,
    PAGE_CONTENT_QUERY,
    await performRequest({ query: PAGE_CONTENT_QUERY, variables: { locale: locale } })
  );

  const {
    data: { home },
  }: HomeQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return home;
};

const Home: FC<PageContextType> = async (props) => {
  console.log('==> home locale', props.params.locale, props.params);
  const home = await query({ locale: props.params.locale });

  const t = await getTranslations('Index');
  return (
    <Layout>
      <h1>{t('title')}</h1>
      <h2>{home.hero[0].title}</h2>
      <h3>{home.hero[0].subtitle}</h3>
      <p>{home.hero[0].description}</p>
      <SpeedInsights />
    </Layout>
  );
};

export const generateMetadata = async ({ params }: PageContextType) => {
  type HomeSeoQuery = {
    data: {
      home: PageSeoType;
    };
  };
  const PAGE_CONTENT_QUERY = `
    query HomeSEOQuery($locale: SiteLocale) {
      home(locale: $locale) {
        ${seoQuery}
      }
    }
    ${responsiveImageFragment}
  `;

  const {
    data: { home },
  }: HomeSeoQuery = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: params.locale,
    },
  });

  return await getMetaData({
    locale: params.locale,
    pageSeo: home,
  });
};

export default Home;
