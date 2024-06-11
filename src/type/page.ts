import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { ReadonlyURLSearchParams } from 'next/navigation';

export type PageContextType = {
  params: Params;
  searchParams: ReadonlyURLSearchParams;
};
