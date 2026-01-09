export interface SearchResult<Type>{
  title: string;
  details?: string;
  data?: Type;
}

export type SearchResults<Type> = Array<SearchResult<Type>>;
