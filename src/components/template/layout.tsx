import { FC, ReactNode } from "react";
import { draftMode } from 'next/headers';
import { TranslateRouteType } from "../atoms/LanguageSwitcher";
import Header from "../organisms/header";
import RemovePreviewButton from "../atoms/RemovePreviewButton";

type LayoutProps = {
  translateRout?: TranslateRouteType[];
  children: ReactNode;
}

const Layout : FC<LayoutProps> = (props) => {
  const {translateRout, children} = props;
  const { isEnabled } = draftMode();

  return (
    <>
      {isEnabled && (
        <RemovePreviewButton />
      )}
      <Header translateRout={translateRout} />
      {children}
    </>
  )
}

export default Layout;