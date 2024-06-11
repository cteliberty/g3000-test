import { notFound } from 'next/navigation';
import { FC } from 'react';

import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';

import TicketItem from '~page/TicketItem';
import { ticketListSlug } from '~page/TicketList';
const getPageComponent = (
  pageSlug: TranslateSlugType[],
  component: FC<PageContextType>
): Record<string, FC<PageContextType>> => {
  let objet = {};

  pageSlug.map((slug) => {
    objet = {
      ...objet,
      ...{
        [slug.slug]: component,
      },
    };
  });
  return objet;
};

const pages: Record<string, FC<PageContextType>> = {
  ...getPageComponent(ticketListSlug, TicketItem),
};

const PageSubSlug: FC<PageContextType> = async (props) => {
  const Component = pages[props.params.slug];
  if (Component) {
    return <Component {...props} />;
  }

  notFound();
};

export default PageSubSlug;
