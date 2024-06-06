import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from 'src/lib/convertSlugToRoute';

export const pmrSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'prm-access'
  },
  {
    locale: 'fr',
    slug: 'acces-pmr'
  },
  {
    locale: 'es',
    slug: 'acceso-pmr'
  }
];

export const pmrRoute: TranslateRouteType[] = convertSlugToRoute(pmrSlug);

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  }
};

type TicketListQueryProps = {
  data: {
    pmr: PageSlugProps;
  };
}

type queryType = {
  locale: string;
}

const queryData = async (props:queryType) : Promise<PageSlugProps> => {
  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query PmrQuery($locale: SiteLocale) {
    pmr(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ pmr }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return pmr;
}

const Pmr: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={pmrRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export default Pmr;