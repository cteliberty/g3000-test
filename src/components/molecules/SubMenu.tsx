import Link from 'next/link';
import { FC } from 'react';

import useGetLink from '~hooks/useGetLink';
import { LinkType } from '~type/link';
import { MenuElement } from '~molecules/ListElementMenu';

export type SubMenuElement = {
  title: string;
  listLink: MenuElement[];
};

type SubMenuType = {
  elements: SubMenuElement[];
};

const ElementLink: FC<LinkType> = async (props) => {
  const { linkLabel, page } = props;

  const link = await useGetLink({
    _modelApiKey: page._modelApiKey,
    slug: page.slug,
  });

  return <Link href={link}>{linkLabel}</Link>;
};

const SubMenu: FC<SubMenuType> = async (props) => {
  const { elements } = props;

  return (
    <div>
      <ul>
        {elements.map(async (element) => (
          <li key={element.title}>
            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, gap: 4 }}>
              {element.listLink.map(async (listLink) => (
                <li key={listLink.linkTarget[0].id}>
                  <ElementLink {...listLink.linkTarget[0]} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubMenu;
