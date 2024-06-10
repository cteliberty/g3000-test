import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from 'src/lib/convertSlugToRoute';

export const ticketListSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'tickets'
  },
  {
    locale: 'fr',
    slug: 'billetterie'
  },
  {
    locale: 'es',
    slug: 'entradas'
  }
];

export const ticketListRoute: TranslateRouteType[] = convertSlugToRoute(ticketListSlug);

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
      ticketList: PageSlugProps;
    };
  }
  
  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query TicketListQuery($locale: SiteLocale) {
    ticketList(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ ticketList }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return ticketList;
}

const TicketList: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={ticketListRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export default TicketList;