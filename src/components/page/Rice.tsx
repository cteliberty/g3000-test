import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Layout from '~template/layout';
import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from '~lib/convertSlugToRoute';

export const riceSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'idsr',
  },
  {
    locale: 'fr',
    slug: 'rice',
  },
  {
    locale: 'es',
    slug: 'rice',
  },
];

export const riceRoute: TranslateRouteType[] = convertSlugToRoute(riceSlug);

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
      rice: PageSlugProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query RiceQuery($locale: SiteLocale) {
    rice(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { rice },
  }: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return rice;
};

const Rice: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  };

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={riceRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export default Rice;
