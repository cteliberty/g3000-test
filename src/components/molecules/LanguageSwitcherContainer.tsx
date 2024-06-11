import { FC } from 'react';
import { getLocale } from 'next-intl/server';

import { locales } from '~source/navigation';
import LanguageSwitcher from '../atoms/LanguageSwitcher';

export type TranslateRouteType = {
  locale: string;
  route: string;
};

export type PromiseTranslateRouteType = Promise<TranslateRouteType[]>;

type LanguageSwitcherContainerProps = {
  translateRout?: TranslateRouteType[];
};

const LanguageSwitcherContainer: FC<LanguageSwitcherContainerProps> = async (props) => {
  const userLocale = await getLocale();

  return <LanguageSwitcher {...props} locales={locales} userLocale={userLocale} />;
};

export default LanguageSwitcherContainer;
