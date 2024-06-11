import { FC } from 'react';
import Link from 'next/link';

import LanguageSwitcher, { TranslateRouteType } from '~atoms/LanguageSwitcher';
import Menu from '~organisms/Menu';

type HeaderProps = {
  translateRout?: TranslateRouteType[];
};

const Header: FC<HeaderProps> = (props) => {
  const { translateRout } = props;

  return (
    <div className="header" style={{ display: 'flex' }}>
      <Link href="/">Home</Link>
      <Menu />

      <LanguageSwitcher translateRout={translateRout} />
    </div>
  );
};

export default Header;
