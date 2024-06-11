import { FC, ReactNode } from 'react';
import { draftMode } from 'next/headers';

import { TranslateRouteType } from '~atoms/LanguageSwitcher';
import Header from '~organisms/header';
import RemovePreviewButton from '~atoms/RemovePreviewButton';
import HeadSite, { SeoMoreType, SeoType } from '~molecules/HeaderSite';

type LayoutProps = {
  translateRout?: TranslateRouteType[];
  children: ReactNode;
  seoPage?: SeoType;
  seoMore?: SeoMoreType;
};

const Layout: FC<LayoutProps> = (props) => {
  const { translateRout, seoPage, seoMore, children } = props;
  const { isEnabled } = draftMode();

  return (
    <>
      <HeadSite seoPage={seoPage} seoMore={seoMore} translateRout={translateRout} />
      {isEnabled && <RemovePreviewButton />}
      <Header translateRout={translateRout} />
      {children}
    </>
  );
};

export default Layout;
