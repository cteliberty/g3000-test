import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from 'src/lib/convertSlugToRoute';

export const hourSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'opening-hours-periods'
  },
  {
    locale: 'fr',
    slug: 'horaires-periodes'
  },
  {
    locale: 'es',
    slug: 'horarios-periodos'
  }
];

export const hourRoute: TranslateRouteType[] = convertSlugToRoute(hourSlug);

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
      hour: PageSlugProps;
    };
  }
  
  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query HourQuery($locale: SiteLocale) {
    hour(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ hour }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return hour;
}

const Hour: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={hourRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export default Hour;