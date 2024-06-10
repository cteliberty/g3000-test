export const internalLinkFragment = `
  fragment internalLinkFragment on InternalLinkRecord {
    _modelApiKey
    id
    linkLabel
    anchor
    page {
      ... on ContentPageRecord {
        _modelApiKey
        id
        slug
        title
      }
      ... on HomeRecord {
        _modelApiKey
        id
        title
      }
      ... on TicketListRecord {
        _modelApiKey
        id
        title
      }
      ... on ProductRecord {
        _modelApiKey
        id
        slug
        title
      }
      ... on AgendaRecord {
        _modelApiKey
        id
        title
      }
      ... on DayRecord {
        _modelApiKey
        id
        title
      }
      ... on HourRecord {
        _modelApiKey
        id
        title
      }
      ... on ComeRecord {
        _modelApiKey
        id
        title
      }
      ... on NightRecord {
        _modelApiKey
        id
        title
      }
      ... on PmrRecord {
        _modelApiKey
        id
        title
      }
      ... on RiceRecord {
        _modelApiKey
        id
        title
      }
      ... on FaqRecord {
        _modelApiKey
        id
        title
      }
      ... on JobRecord {
        _modelApiKey
        id
        title
      }
      ... on PressRecord {
        _modelApiKey
        id
        title
      }
    }
  }
`;
