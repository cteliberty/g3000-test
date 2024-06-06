import { FC, ReactNode } from "react";
import { TranslateRouteType } from "../atoms/LanguageSwitcher";
import Header from "../organisms/header";

type LayoutProps = {
  translateRout?: TranslateRouteType[];
  children: ReactNode;
}

const Layout : FC<LayoutProps> = (props) => {
  const {translateRout, children} = props;

  return (
    <>
      <Header translateRout={translateRout} />
      {children}
  </>
  )
}

export default Layout;