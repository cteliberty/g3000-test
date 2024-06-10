import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from 'src/lib/convertSlugToRoute';
import getMetaData, { PageSeoType } from 'src/lib/getMetataDato';
import { seoQuery } from 'src/query/seoQuery';
import { responsiveImageFragment } from 'src/fragments/responsiveImageFragment';
import { Metadata } from 'next';

export const agendaSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'calendar'
  },
  {
    locale: 'fr',
    slug: 'agenda'
  },
  {
    locale: 'es',
    slug: 'calendario'
  }
];

export const agendaRoute: TranslateRouteType[] = convertSlugToRoute(agendaSlug);

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
      agenda: PageSlugProps;
    };
  }

  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query AgendaQuery($locale: SiteLocale) {
    agenda(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ agenda }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return agenda;
}

const Agenda: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={agendaRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export const agendaMetadata = async (props: PageContextType): Promise<Metadata> => {
  const params = {
    locale: props.params.locale,
    slug: props.params.slug,
  }

  type PageSlugSeoQuery = {
    data: {
      agenda: PageSeoType
      ;
    };
  }

  const PAGE_CONTENT_QUERY = `
    query AgendaSEOQuery($locale: SiteLocale) {
      agenda(locale: $locale) {
        ${seoQuery}
      }
    }
    ${responsiveImageFragment}
  `;

  const {data:{ agenda }}: PageSlugSeoQuery = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: params,
  });

  return await getMetaData({
    locale: params.locale,
    pageSeo: agenda
    ,
    translateRout: agendaRoute,
  });
}

export default Agenda;