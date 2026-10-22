import entries from "../../content/publications.json";

export type Publication = {
  venue: string;
  award?: string;
  title: string;
  authors: string;
  note: string;
  href: string;
  showOnHome?: boolean;
  image?: string;
  imageAlt?: string;
};

export const publications: Publication[] = entries;
export const selectedPublications = publications.filter(publication => publication.showOnHome === true);
