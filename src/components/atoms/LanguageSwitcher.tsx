'use client';

import { FC, Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import LinkLocale from '~atoms/LinkLocale';

export type TranslateRouteType = {
  locale: string;
  route: string;
};

export type PromiseTranslateRouteType = Promise<TranslateRouteType[]>;

type LanguageSwitcherProps = {
  translateRout?: TranslateRouteType[];
  locales: readonly string[];
  userLocale: string;
};

const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
  const { translateRout, userLocale, locales } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (element: HTMLDivElement) => {
      element.classList.add('active');
      const height = element.offsetHeight;
      element.classList.remove('active');
      element.classList.add('animate');
      setTimeout(() => {
        element.style.maxHeight = `${height}px`;
        setTimeout(() => {
          element.classList.add('active');
          element.classList.remove('animate');
          element.style.maxHeight = '';
        }, 300);
      }, 1);
    };

    const close = (element: HTMLDivElement) => {
      element.style.maxHeight = `${element.offsetHeight}px`;
      element.classList.add('animate');
      element.classList.remove('active');
      setTimeout(() => {
        element.style.maxHeight = `${0}px`;
        setTimeout(() => {
          element.classList.remove('animate');
          element.style.maxHeight = '';
        }, 300);
      }, 1);
    };

    if (listRef.current) {
      const element = listRef.current;
      if (isOpen) {
        open(element);
      } else if (element.classList.contains('active')) {
        close(element);
      }
    }
  }, [isOpen]);

  return (
    <div className="m_LanguageSwitch">
      <div
        className="m_LanguageSwitch_localeActive"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <LinkLocale
          translateRout={translateRout?.find((element) => element.locale === userLocale)}
          locale={userLocale}
        />
        <span className={classNames('m_LanguageSwitch_chevron', { active: isOpen })}>{'>'}</span>
      </div>
      <div className={classNames('m_LanguageSwitch_contentList')} ref={listRef}>
        <div className={classNames('m_LanguageSwitch_containerList')}>
          <ul className="m_LanguageSwitch_listLink">
            {locales?.map((locale) => (
              <Fragment key={`languageSwitchLink-${locale}`}>
                {locale !== userLocale && (
                  <li
                    className={classNames('m_LanguageSwitch_link', {
                      active: locale === userLocale,
                    })}
                  >
                    <LinkLocale
                      translateRout={translateRout?.find((element) => element.locale === locale)}
                      locale={locale}
                    />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
