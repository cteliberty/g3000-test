import { FC } from 'react';
import LinkLocale from './LinkLocale';
import { locales } from 'src/navigation';
import { getLocale } from 'next-intl/server';

export type TranslateRouteType = {
  locale: string;
  route: string;
}

export type PromiseTranslateRouteType = Promise<TranslateRouteType[]>

type LanguageSwitcher = {
  translateRout?: TranslateRouteType[];
}

const LanguageSwitcher: FC<LanguageSwitcher> = async (props) => {
  const {translateRout} = props
  const useLocale = await getLocale();

  return (
    <ul style={{listStyle: 'none', display: 'flex', margin: 0, gap: 8}}>
      {locales.map((locale) => (
        <li key={locale} style={useLocale === locale ? {fontWeight: 'bold'} : {}}>
          <LinkLocale translateRout={translateRout?.find((element) => element.locale === locale)} locale={locale}/>
        </li>
      ))}
    </ul>
  );
}

export default LanguageSwitcher;