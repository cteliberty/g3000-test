import { FC } from 'react';
import { locales } from 'src/i18n';
import LinkLocale from './LinkLocale';

export type TranslateRouteType = {
  locale: string;
  route: string;
}

export type PromiseTranslateRouteType = Promise<TranslateRouteType[]>


type LanguageSwitcher = {
  translateRout?: TranslateRouteType[];
}

const LanguageSwitcher: FC<LanguageSwitcher> = (props) => {
  const {translateRout} = props

  return (
    <ul style={{listStyle: 'none', display: 'flex', margin: 0}}>
      {locales.map((locale) => (
        <li key={locale}>
          <LinkLocale translateRout={translateRout?.find((element) => element.locale === locale)} locale={locale}/>
        </li>
      ))}
    </ul>
  );
}

export default LanguageSwitcher;