import { ResponseBodyQueryType, performRequest } from '../lib/datocms';

//home(locale: $locale) {
const PAGE_CONTENT_QUERY = `query HomeQuery
{
  home {
    hero {
      title
      subtitle
      description
    }
  }
}`;

export type HomeProps = {
  hero: {
    subtitle?: string;
    title?: string;
    description?: string;
  }[];
};

type HomeQueryProps = {
  data: {
    home: HomeProps;
  };
}

export default async function test() {
  const {data:{ home }}: HomeQueryProps = await performRequest({ query: PAGE_CONTENT_QUERY });
  console.log(' ==> data', home);
  console.log(' ==> test');

  // const { initialData } = props.subscription;
  // const { hero, informations, sliderProduct, sliderVisit, sliderExperience, seo, seoMore } =
  //   converterHome(initialData.home);

  // const { t } = useTranslation('common');
  // const [isSliderPause, setIsSliderPause] = useState<boolean>(false);
  // const isMobile = useMediaQuery(ResponsiveSize.SCREEN_S_MAX);

  // const generalInformationClass = 't_GeneralInformation';

  return (
    <>
      <div>test</div>
      <h1>{home.hero[0].title}</h1>
    </>
    // <Layout
    //   {...props.subscription}
    //   setIsSliderPause={setIsSliderPause}
    //   seo={{
    //     seoPage: seo,
    //     seoMore: seoMore,
    //   }}
    // >
    //   <Hero {...hero} pageData={initialData} isSliderPause={isSliderPause} />

    //   {/* Informations */}
    //   <div className={generalInformationClass}>
    //     {isMobile ? (
    //       <Tab
    //         className={generalInformationClass}
    //         additionalClass="wrapper-min"
    //         list={informations}
    //         color={colorButton.SECONDARY}
    //       >
    //         {informations.map((content, key) => (
    //           <div
    //             data-tab-content
    //             key={key}
    //             id={`${content._modelApiKey}`}
    //             className={key === 0 ? 'active' : ''}
    //           >
    //             <GeneralInformation key={key} {...content} />
    //           </div>
    //         ))}
    //       </Tab>
    //     ) : (
    //       <div className="wrapper-min">
    //         <div className={`${generalInformationClass}_content`}>
    //           {informations.map((item, key) => (
    //             <GeneralInformation key={key} {...item} />
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>

    //   {/* SliderProduct */}
    //   <BlockListItem
    //     isSlider={true}
    //     additionalClass="t_SliderProduct"
    //     {...sliderProduct}
    //     button={[
    //       {
    //         _modelApiKey: 'internal_link',
    //         page: {
    //           _modelApiKey: 'ticket_list',
    //         },
    //         linkLabel: sliderProduct.linkLabel ? sliderProduct.linkLabel : t('ticketing'),
    //       },
    //     ]}
    //   />

    //   {/* SliderVisit */}
    //   <ListVisitSlider {...sliderVisit} />

    //   {/* SliderExperience */}
    //   <BlockListItem
    //     isExperienceSlider={true}
    //     additionalClass="t_SliderExperience"
    //     {...sliderExperience}
    //   />
    // </Layout>
  );
}
