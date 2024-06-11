import { FC } from 'react';
import Link from 'next/link';

import { TranslateRouteType } from '~atoms/LanguageSwitcher';
import Menu from '~organisms/Menu';
import LanguageSwitcherContainer from '~molecules/LanguageSwitcherContainer';

type HeaderProps = {
  translateRout?: TranslateRouteType[];
};

const Header: FC<HeaderProps> = (props) => {
  const { translateRout } = props;

  return (
    <div className="header" style={{ display: 'flex' }}>
      <Link href="/">Home</Link>
      <Menu />

      <div style={{ position: 'relative' }}>
        <LanguageSwitcherContainer translateRout={translateRout} />
      </div>
    </div>
  );
};

export default Header;
