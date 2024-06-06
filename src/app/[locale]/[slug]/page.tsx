import { notFound } from 'next/navigation';
import { FC } from 'react';
import Agenda, { agendaSlug } from 'src/components/page/Agenda';
import Come, { comeSlug } from 'src/components/page/Come';
import Day, { daySlug } from 'src/components/page/Day';
import Faq, { faqSlug } from 'src/components/page/Faq';
import Hour, { hourSlug } from 'src/components/page/Hour';
import Job, { jobSlug } from 'src/components/page/Job';
import Live, { liveSlug } from 'src/components/page/Live';
import Night, { nightSlug } from 'src/components/page/Night';
import Pmr, { pmrSlug } from 'src/components/page/Pmr';
import Press, { pressSlug } from 'src/components/page/Press';
import Rice, { riceSlug } from 'src/components/page/Rice';
import TicketList, { ticketListSlug } from 'src/components/page/TicketList';
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
}

const PageSlug: FC<PageContextType> = async (props) => {
  const Component = pages[props.params.slug];
  if (Component) {
    return <Component {...props} />
  }

  notFound();
}

export default PageSlug;