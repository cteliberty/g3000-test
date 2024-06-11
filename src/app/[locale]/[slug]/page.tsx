import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { PageContextType } from '~type/page';
import { TranslateSlugType } from '~type/translateSlug';
import Agenda, { agendaMetaData, agendaSlug } from '~page/Agenda';
import Come, { comeSlug } from '~page/Come';
import Day, { daySlug } from '~page/Day';
import Faq, { faqSlug } from '~page/Faq';
import Hour, { hourSlug } from '~page/Hour';
import Job, { jobSlug } from '~page/Job';
import Live, { liveSlug } from '~page/Live';
import Night, { nightSlug } from '~page/Night';
import Pmr, { pmrSlug } from '~page/Pmr';
import Press, { pressSlug } from '~page/Press';
import Rice, { riceSlug } from '~page/Rice';
import TicketList, { ticketListSlug } from '~page/TicketList';

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
  ...getPageComponent(ticketListSlug, TicketList),
  ...getPageComponent(agendaSlug, Agenda),
  ...getPageComponent(comeSlug, Come),
  ...getPageComponent(daySlug, Day),
  ...getPageComponent(hourSlug, Hour),
  ...getPageComponent(liveSlug, Live),
  ...getPageComponent(nightSlug, Night),
  ...getPageComponent(pmrSlug, Pmr),
  ...getPageComponent(riceSlug, Rice),
  ...getPageComponent(faqSlug, Faq),
  ...getPageComponent(jobSlug, Job),
  ...getPageComponent(pressSlug, Press),
};

// eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
export type PromiseMetadata = (props: PageContextType) => Promise<Metadata>;

const getMetaData = (
  pageSlug: TranslateSlugType[],
  metadata: PromiseMetadata
): Record<string, PromiseMetadata> => {
  let objet = {};

  pageSlug.map((slug) => {
    objet = {
      ...objet,
      ...{
        [slug.slug]: metadata,
      },
    };
  });
  return objet;
};

const metadata: Record<string, PromiseMetadata> = {
  ...getMetaData(agendaSlug, agendaMetaData),
  // ALL PAGE
};

const PageSlug: FC<PageContextType> = async (props) => {
  const Component = pages[props.params.slug];
  if (Component) {
    return <Component {...props} />;
  }

  notFound();
};

export const generateMetadata = async (props: PageContextType) => {
  const getMetaData = metadata[props.params.slug];
  if (getMetaData) {
    return await getMetaData(props);
  }

  return {};
};

export default PageSlug;
