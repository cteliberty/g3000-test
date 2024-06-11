import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Layout from '~template/layout';
import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from '~lib/convertSlugToRoute';

export const pressSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'presss',
  },
  {
    locale: 'fr',
    slug: 'presse',
  },
  {
    locale: 'es',
    slug: 'revistas',
  },
];

export const pressRoute: TranslateRouteType[] = convertSlugToRoute(pressSlug);

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
      press: PageSlugProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query PressQuery($locale: SiteLocale) {
    press(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { press },
  }: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return press;
};

const Press: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  };

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={pressRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export default Press;
