import { getLocale } from "next-intl/server";
import { agendaSlug } from "src/components/page/Agenda";
import { comeSlug } from "src/components/page/Come";
import { daySlug } from "src/components/page/Day";
import { faqSlug } from "src/components/page/Faq";
import { hourSlug } from "src/components/page/Hour";
import { jobSlug } from "src/components/page/Job";
import { liveSlug } from "src/components/page/Live";
import { nightSlug } from "src/components/page/Night";
import { pmrSlug } from "src/components/page/Pmr";
import { pressSlug } from "src/components/page/Press";
import { riceSlug } from "src/components/page/Rice";
import { ticketListSlug } from "src/components/page/TicketList";
import { PageLink } from "src/type/link";
import { TranslateSlugType } from "src/type/translateSlug";

const getSlugPage = (slugLocale: TranslateSlugType[] | undefined, locale: string): string => {
  return slugLocale?.find((element) => element.locale === locale)?.slug ?? '';
};

const useGetLink = async (page: PageLink | undefined): Promise<string> => {
  const locale = await getLocale();

  if (page) {
    switch (page._modelApiKey) {
      case 'home':
        return '/';

      case 'content_page':
        return `/page/${page.slug}`;

      case 'ticket_list':
        return `/${getSlugPage(ticketListSlug, locale)}/`;

      case 'product':
        return `/${getSlugPage(ticketListSlug, locale)}/${page.slug}`;

      case 'live':
        return `/${getSlugPage(liveSlug, locale)}/`;

      case 'webcam':
        return `/${getSlugPage(liveSlug, locale)}/#webcam`;

      case 'weather':
        return `/${getSlugPage(liveSlug, locale)}/#weather`;

      case 'agenda':
        return `/${getSlugPage(agendaSlug, locale)}/`;

      case 'day':
        return `/${getSlugPage(daySlug, locale)}/`;

      case 'hour':
        return `/${getSlugPage(hourSlug, locale)}/`;

      case 'come':
        return `/${getSlugPage(comeSlug, locale)}/`;

      case 'night':
        return `/${getSlugPage(nightSlug, locale)}/`;

      case 'pmr':
        return `/${getSlugPage(pmrSlug, locale)}/`;

      case 'rice':
        return `/${getSlugPage(riceSlug, locale)}/`;

      case 'faq':
        return `/${getSlugPage(faqSlug, locale)}/`;

      case 'job':
        return `/${getSlugPage(jobSlug, locale)}/`;

      case 'press':
        return `/${getSlugPage(pressSlug, locale)}/`;

      default:
        return '/404';
    }
  }

  return '/404';
};

export default useGetLink;