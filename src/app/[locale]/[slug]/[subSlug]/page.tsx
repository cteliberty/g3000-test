import { notFound } from 'next/navigation';
import { FC } from 'react';
import TicketItem from 'src/components/page/TicketItem';
import { ticketListSlug } from 'src/components/page/TicketList';
import { PageContextType } from 'src/type/page';
import { TranslateSlugType } from 'src/type/translateSlug';

const getPageComponent = (pageSlug: TranslateSlugType[], component : FC<PageContextType>): Record<string, FC<PageContextType>> => {
  let objet = {};
  
  pageSlug.map((slug) => {
    objet = {
      ...objet,
      ...{
        [slug.slug]: component
      }
    }
  })
  return objet;
}

const pages: Record<string, FC<PageContextType>> = {
  ...getPageComponent(ticketListSlug, TicketItem),
}

const PageSubSlug: FC<PageContextType> = async (props) => {
  const Component = pages[props.params.slug];
  if (Component) {
    return <Component {...props} />
  }

  notFound();
}

export default PageSubSlug;