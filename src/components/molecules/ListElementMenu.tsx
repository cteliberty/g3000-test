import Link from 'next/link';
import { FC } from 'react';

import useGetLink from '~hooks/useGetLink';
import { LinkType } from '~type/link';

export type MenuElement = {
  linkTarget: LinkType[];
};

type ListElementMenuType = {
  elements: MenuElement[];
};

const ElementLink: FC<LinkType> = async (props) => {
  const { linkLabel, page } = props;

  const link = await useGetLink({
    _modelApiKey: page._modelApiKey,
    slug: page.slug,
  });

  return <Link href={link}>{linkLabel}</Link>;
};

const ListElementMenu: FC<ListElementMenuType> = async (props) => {
  const { elements } = props;

  return (
    <div>
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, gap: 4 }}>
        {elements.map((element) => (
          <li key={element.linkTarget[0].id}>
            <ElementLink {...element.linkTarget[0]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListElementMenu;
