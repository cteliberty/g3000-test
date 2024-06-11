import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Layout from '~template/layout';
import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from '~lib/convertSlugToRoute';

export const daySlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'your-day',
  },
  {
    locale: 'fr',
    slug: 'votre-journee',
  },
  {
    locale: 'es',
    slug: 'su-día',
  },
];

export const dayRoute: TranslateRouteType[] = convertSlugToRoute(daySlug);

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
      day: PageSlugProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query DayQuery($locale: SiteLocale) {
    day(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { day },
  }: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return day;
};

const Day: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  };

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={dayRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export default Day;
