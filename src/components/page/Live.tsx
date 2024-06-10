import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from 'src/lib/convertSlugToRoute';

export const liveSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'live'
  },
  {
    locale: 'fr',
    slug: 'live'
  },
  {
    locale: 'es',
    slug: 'live'
  }
];

export const liveRoute: TranslateRouteType[] = convertSlugToRoute(liveSlug);

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  }
};

type queryType = {
  locale: string;
}

const queryData = async (props:queryType) : Promise<PageSlugProps> => {
  type TicketListQueryProps = {
    data: {
      live: PageSlugProps;
    };
  }
  
  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query LiveQuery($locale: SiteLocale) {
    live(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ live }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return live;
}

const Live: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={liveRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export default Live;