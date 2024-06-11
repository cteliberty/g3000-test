export type PageLink = {
  slug?: string;
  _modelApiKey: string;
};

export type LinkType = {
  _modelApiKey: string;
  id: string;
  linkLabel: string;
  anchor: string;
  page: {
    _modelApiKey: string;
    id: string;
    title: string;
    slug?: string;
  };
};
