import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Layout from '~template/layout';
import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from '~lib/convertSlugToRoute';

export const nightSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'night-at-the-top',
  },
  {
    locale: 'fr',
    slug: 'nuit-au-sommet',
  },
  {
    locale: 'es',
    slug: 'noche-en-la-cima',
  },
];

export const nightRoute: TranslateRouteType[] = convertSlugToRoute(nightSlug);

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  };
};

type queryType = {
  locale: string;
};

const queryData = async (props: queryType): Promise<PageSlugProps> => {
  type TicketListQueryProps = {
    data: {
      night: PageSlugProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query NightQuery($locale: SiteLocale) {
    night(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { night },
  }: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return night;
};

const Night: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  };

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={nightRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export default Night;
