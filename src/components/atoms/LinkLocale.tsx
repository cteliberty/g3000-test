import { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import FlagEn from '~assets/images/flag/en.svg';
import FlagFr from '~assets/images/flag/fr.svg';
import FlagEs from '~assets/images/flag/es.svg';

import { TranslateRouteType } from '~atoms/LanguageSwitcher';

type LinkLocaleProps = {
  translateRout?: TranslateRouteType;
  locale: string;
};

type LanguageLinkProps = {
  locale: string;
};

const LinkLocale: FC<LinkLocaleProps> = (props) => {
  const { translateRout, locale } = props;

  const Flag = ({ locale }: LanguageLinkProps): ReactNode => {
    switch (locale) {
      case 'fr':
        return (
          <Image src={FlagFr} alt="Drapeau français" width={20} height={20} priority={false} />
        );
      case 'en':
        return <Image src={FlagEn} alt="English flag" width={20} height={20} priority={false} />;
      case 'es':
        return (
          <Image src={FlagEs} alt="Bandera española" width={20} height={20} priority={false} />
        );
      default:
        return '';
    }
  };

  const content = (
    <span className="a_LanguageLink">
      <span className="a_LanguageLink_flag">
        <Flag locale={locale} />
      </span>
      <span className="a_LanguageLink_locale">{locale.toUpperCase()}</span>
    </span>
  );

  if (translateRout?.locale === locale) {
    return (
      <Link href={`/${locale}${translateRout.route}`} title={locale} locale={locale}>
        {content}
      </Link>
    );
  }
  return (
    <Link href={`/${locale}`} title={locale} locale={locale}>
      {content}
    </Link>
  );
};

export default LinkLocale;
