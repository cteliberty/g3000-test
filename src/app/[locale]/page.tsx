import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import Layout from 'src/components/template/layout'
import { performRequest } from 'src/lib/datocms';
import { PageContextType } from 'src/type/page';

export type HomeProps = {
  hero: {
    subtitle?: string;
    title?: string;
    description?: string;
  }[];
};

type HomeQueryProps = {
  data: {
    home: HomeProps;
  };
}

type queryType = {
  locale: string;
}

const query = async (props:queryType) : Promise<HomeProps> => {
  const {locale} = props;

  const PAGE_CONTENT_QUERY = `query HomeQuery($locale: SiteLocale) {
    home(locale: $locale) {
      hero {
        title
        subtitle
        description
      }
    }
  }`;

  console.log('==> home', await performRequest({ query: PAGE_CONTENT_QUERY, variables: {locale: locale} }));

  const {data:{ home }}: HomeQueryProps = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    },
  });
  return home;
}

const Home: FC<PageContextType> = async (props) => {
  console.log('==> home locale', props.params.locale, props.params);
  const home = await query({locale: props.params.locale});

  const t = await getTranslations('Index');
  return (
    <Layout>
      <h1>{t('title')}</h1>
      <h2>{home.hero[0].title}</h2>
      <h3>{home.hero[0].subtitle}</h3>
      <p>{home.hero[0].description}</p>
    </Layout>
  );
}

export default Home;