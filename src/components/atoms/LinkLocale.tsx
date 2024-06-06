import { FC } from "react"
import { TranslateRouteType } from "./LanguageSwitcher"
import Link from "next/link"

type LinkLocaleProps = {
  translateRout?: TranslateRouteType,
  locale: string
}

const LinkLocale:FC <LinkLocaleProps> = (props) => {
  const {translateRout, locale} = props;

  if (translateRout?.locale === locale) {
    return (
      <Link href={`/${locale}${translateRout.route}`} title={locale} locale={locale}>{locale}</Link>
    )
  }
  return (
    <Link href={`/${locale}`} title={locale} locale={locale}>{locale}</Link>
  )
}

export default LinkLocale;
