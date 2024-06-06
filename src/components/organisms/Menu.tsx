import { FC } from "react";
import Link from "next/link";
import useGetLink from "src/hooks/useGetLink";
import { getLocale, getTranslations } from "next-intl/server";
import { menuFragment } from "src/frangments/menuFragment";
import { internalLinkFragment } from "src/frangments/internalLinkFragment";
import { externalLinkFragment } from "src/frangments/externalLinkFragment";
import { performRequest } from "src/lib/datocms";
import SubMenu, { SubMenuElement } from "../molecules/SubMenu";
import ListElementMenu, { MenuElement } from "../molecules/ListElementMenu";

type MenuType = {
}

type queryType = {
  locale: string;
}

type MenuDataType = {
  planYourVisit :SubMenuElement[],
  experiences:SubMenuElement[],
  aboutUs: MenuElement[],
}

type MenuQueryType = {
  data: {
    menu: MenuDataType,
  }
}

const queryData = async (props:queryType) : Promise<MenuDataType> => {
  const {locale} = props;
  const PAGE_CONTENT_QUERY = `query MenuQuery($locale: SiteLocale) {
    menu(locale: $locale) {
      hidePlan
      planYourVisit {
        ...submenuFragment
      }
      hideExperiences
      experiences {
        ...submenuFragment
      }
      hideAbout
      aboutUs {
        ...submenuLinkFragment
      }
    }
  }
  ${internalLinkFragment}
  ${externalLinkFragment}
  ${menuFragment}
`;

  const {data:{ menu }}: MenuQueryType = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: {
      locale: locale
    }
  });
  return menu;
}

const Menu : FC<MenuType> = async (props) => {
  const t = await getTranslations('common');

  const locale = await getLocale();

  const menu = await queryData({locale})

  return (
    <div>
      <Link href={await useGetLink({
        _modelApiKey: 'ticket_list'
      })}>{t('ticketing')}</Link>
      <SubMenu elements={menu.planYourVisit} />
      <SubMenu elements={menu.experiences} />
      <ListElementMenu elements={menu.aboutUs} />
    </div>
  )
}

export default Menu;