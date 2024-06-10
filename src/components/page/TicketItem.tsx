import { getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Layout from 'src/components/template/layout';
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';
import { ticketListSlug } from './TicketList';
import { TranslateSlugType } from 'src/type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import { SlugLocaleQueryType } from 'src/type/slugLocale';
import { notFound } from 'next/navigation';

export type PageSlugProps = {
  title?: string;
  header: {
    description?: string;
  }
};

type TicketListQueryProps = {
  data: {
    product: PageSlugProps;
  };
}

type queryType = {
  locale: string;
  subSlug: string;
}


const queryRoute = async (props:queryType, translateSlug: TranslateSlugType[]) : Promise<TranslateRouteType[]> => {
  type PageSlugQueryRouteProps = {
    data: {
      product?: SlugLocaleQueryType;
    };
  }
  
  const {subSlug, locale} = props;
  const translateRoute:TranslateRouteType[] = [];

  const PAGE_CONTENT_QUERY = `query TicketItemSlugQuery($subSlug: String, $locale: SiteLocale) {
    product (locale: $locale, filter: {slug: {eq: $subSlug}}) {
      _allSlugLocales {
        locale
        value
      }
    }
  }`;

  const {data:{ product }}: PageSlugQueryRouteProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      subSlug: subSlug,
    }
  });

  if (!product) notFound();
  const {_allSlugLocales} = product;
  _allSlugLocales.map((slugLocales) => {
    translateRoute.push({
      locale: slugLocales.locale,
      route: `/${translateSlug.find((element) => element.locale === slugLocales.locale)?.slug}/${slugLocales.value}`,
    })
  })

  return translateRoute;
}

const queryData = async (props:queryType) : Promise<PageSlugProps> => {
  const {locale, subSlug} = props;
  const PAGE_CONTENT_QUERY = `query TicketItemQuery($subSlug: String, $locale: SiteLocale) {
      product (locale: $locale, filter: {slug: {eq: $subSlug}}) {
      title
      header {
        description
      }
    }
  }`;

  const {data:{ product }}: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
      subSlug: subSlug,
    }
  });
  return product;
}

const TicketItem: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
    subSlug: props.params.subSlug,
  }

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={await queryRoute(params, ticketListSlug)}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
}

export default TicketItem;