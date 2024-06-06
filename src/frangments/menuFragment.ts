export const menuFragment = `
  fragment submenuLinkFragment on SubmenuLinkRecord {
    linkTarget {
        ...internalLinkFragment
        ...externalLinkFragment
    }
  }

  fragment submenuFragment on SubmenuRecord {
    title
    listLink {
      ...submenuLinkFragment
    }
  }
`;
