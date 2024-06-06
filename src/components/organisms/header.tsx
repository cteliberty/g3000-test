import { FC } from "react";
import LanguageSwitcher, { TranslateRouteType } from "../atoms/LanguageSwitcher";
import Link from "next/link";
import Menu from "./Menu";

type Header = {
  translateRout?: TranslateRouteType[];
}

const Header : FC<Header> = (props) => {
  const {translateRout} = props;

  return (
    <div className="header" style={{display: 'flex'}}>
      <Link href="/">Home</Link>
      <Menu />

      <LanguageSwitcher translateRout={translateRout} />
    </div>
  )
}

export default Header;