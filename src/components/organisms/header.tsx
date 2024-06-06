import { FC } from "react";
import LanguageSwitcher, { TranslateRouteType } from "../atoms/LanguageSwitcher";

type Header = {
  translateRout?: TranslateRouteType[];
}

const Header : FC<Header> = (props) => {

  const {translateRout} = props;

  return (
    <div className="header" style={{display: 'flex'}}>
      <a href="/fr">Home</a>
      <ul style={{listStyle: 'none', display: 'flex', margin: 0}}>
        <li>
          <a href="/fr/page/mentions-legales">Mention legale</a>
        </li>
        <li>
          <a href="/fr/billetterie/">billetterie</a>
        </li>
      </ul>

      <LanguageSwitcher translateRout={translateRout} />
    </div>
  )
}

export default Header;