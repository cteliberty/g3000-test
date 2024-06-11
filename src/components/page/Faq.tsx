import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Layout from '~template/layout';
import { performRequest } from '~lib/datocms';
import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import { TranslateRouteType } from '../atoms/LanguageSwitcher';
import convertSlugToRoute from '~lib/convertSlugToRoute';

export const faqSlug: TranslateSlugType[] = [
  {
    locale: 'en',
    slug: 'faq',
  },
  {
    locale: 'fr',
    slug: 'faq',
  },
  {
    locale: 'es',
    slug: 'preguntas-frecuentes',
  },
];

export const faqRoute: TranslateRouteType[] = convertSlugToRoute(faqSlug);

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
      faq: PageSlugProps;
    };
  };

  const { locale } = props;
  const PAGE_CONTENT_QUERY = `query FaqQuery($locale: SiteLocale) {
    faq(locale: $locale) {
      title
      header {
        description
      }
    }
  }`;

  const {
    data: { faq },
  }: TicketListQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale,
    },
  });
  return faq;
};

const Faq: FC<PageContextType> = async (props) => {
  const params = {
    locale: props.params.locale,
  };

  const pageSlug = await queryData(params);

  const t = await getTranslations('Index');
  return (
    <Layout translateRout={faqRoute}>
      <h1>{t('title')}</h1>
      <h2>{pageSlug.title}</h2>
      {/* <h3>{pageSlug.hero[0].subtitle}</h3>
      <p>{pageSlug.hero[0].description}</p> */}
    </Layout>
  );
};

export default Faq;
