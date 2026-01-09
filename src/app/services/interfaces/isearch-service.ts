import {Observable} from 'rxjs';
import {SearchResult, SearchResults} from '../../common/interfaces/search-result';
import {PaginatedResult} from '../../common/classes/paginated-result';
import {RepositoryParams} from '../../common/interfaces/repository-params';

export interface ISearchService<T> {
  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<SearchResult<T>>>;
}
