export const seoQuery: string = `
  seoPage: seo {
    description
    image {
      data: responsiveImage(imgixParams: {fit: max, w: "600", h: "315"}) {
        ...responsiveImageFragment
      }
    }
    title
    noIndex
    twitterCard
  }
  seoMore {
    canonicalLink
  }
`;
