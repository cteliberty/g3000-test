import { DatocmsRequest, performRequest, ResponseBodyQueryType } from '~lib/datocms';

export type ContextProps = {
  params?: {
    locale: string;
    slug?: string;
  };
};

export type PageDataProps = {
  // warningBanner: WarningBannerProps;
  // header: HeaderType;
  // menu: DatoMenuProps;
  // footer: DatoFooterProps;
  // _site: DefaultSiteSettingType;
};

export type SubscriptionProps = {
  initialData: PageDataProps;
  token: string | undefined;
  environment: string | null;
  query?: string;
};

export type SlugLocaleProps = {
  value: string;
  locale: string;
};

export type EntitySlugLocaleProps = {
  slugLocales: SlugLocaleProps[];
};

export type SlugLocalesRequestProps = {
  allEntity?: string;
};

export type PathsProps = {
  params?: {
    slug?: string;
    subSlug?: string;
    locale?: string;
  };
};

export type AllSlugLocales = {
  allSlugLocales: EntitySlugLocaleProps[];
};

export async function getSubscription(graphqlRequest: DatocmsRequest): Promise<SubscriptionProps> {
  return {
    // subscription: preview
    //   ? {
    //       ...graphqlRequest,
    //       initialData: await request(graphqlRequest),
    //       token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
    //       environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
    //     }
    //   : {
    //       enabled: false,
    //       initialData: await request(graphqlRequest),
    //     },
    ...graphqlRequest,
    initialData: await performRequest(graphqlRequest),
    token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
    environment: process.env.NEXT_DATOCMS_ENVIRONMENT ?? null,
  };
}

export const getParamsSubSlugLocales = (
  slugLocales: SlugLocaleProps[],
  presentSlugLocales: SlugLocaleProps[]
) => {
  const pathsArray: PathsProps[] = [];

  slugLocales.map((slugLocale) => {
    pathsArray.push({
      params: {
        slug: presentSlugLocales.find((slug) => slug.locale === slugLocale.locale)?.value,
        subSlug: slugLocale.value,
        locale: slugLocale.locale,
      },
    });
  });

  return pathsArray;
};

export const getParamsSlugLocales = (slugLocales: SlugLocaleProps[]) => {
  const pathsArray: PathsProps[] = [];

  slugLocales.map((slugLocale) => {
    pathsArray.push({
      params: {
        slug: slugLocale.value,
        locale: slugLocale.locale,
      },
    });
  });

  return pathsArray;
};

// export const getSubSlugLocalesStaticPaths = async (pageList: PageSubSlugLocale[]) => {
//   let pathsArray: PathsProps[] = [];

//   await Promise.all(
//     pageList.map(async (page) => {
//       const { allEntity, filter = '', parentPage } = page;
//       if (allEntity) {
//         const data = await performRequest({
//           query: `{
//           allEntity: ${allEntity}${filter && `(filter: ${filter})`} {
//             slugLocales: _allSlugLocales {
//               locale
//               value
//             }
//           }
//         }`,
//         });

//         data.allEntity.map((entity: EntitySlugLocaleProps) => {
//           pathsArray = [
//             ...pathsArray,
//             ...getParamsSubSlugLocales(entity.slugLocales, parentPage.slugLocales),
//           ];
//         });
//       } else {
//         i18nextConfig.i18n.locales.map((lng) => {
//           pathsArray.push({
//             // locale: lng,
//             params: {
//               locale: lng,
//             },
//           });
//         });
//       }
//     })
//   );

//   return {
//     paths: pathsArray,
//     fallback: false,
//   };
// };

type DataSlugLocalesProps = ResponseBodyQueryType & {
  data: {
    allEntity: EntitySlugLocaleProps[];
  };
};
export const getSlugLocalesStaticPaths = async (props: SlugLocalesRequestProps) => {
  const { allEntity } = props;
  let pathsArray: PathsProps[] = [];

  if (allEntity) {
    const data: DataSlugLocalesProps = await performRequest({
      query: `{
        allEntity: ${allEntity} {
          slugLocales: _allSlugLocales {
            locale
            value
          }
        }
      }`,
    });

    data.data.allEntity.map((entity: EntitySlugLocaleProps) => {
      pathsArray = [...pathsArray, ...getParamsSlugLocales(entity.slugLocales)];
    });
  }
  // else {
  //   i18nextConfig.i18n.locales.map((lng) => {
  //     pathsArray.push({
  //       // locale: lng,
  //       params: {
  //         locale: lng,
  //       },
  //     });
  //   });
  // }

  return {
    paths: pathsArray,
    fallback: true,
  };
};

// export const getLocal = (props: GetLocalProps) => {
//   const { context, locale } = props;
//   if (context?.params?.locale) {
//     return context.params.locale;
//   } else if (locale) {
//     return locale.split('-')[0];
//   }
//   return i18nextConfig.i18n.defaultLocale;
// };
