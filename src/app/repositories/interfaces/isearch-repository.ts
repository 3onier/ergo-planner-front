import {RepositoryParams} from '../../common/interfaces/repository-params';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../common/classes/paginated-result';

export interface ISearchRepository<T>{
  searchFullText(txt: string, options: RepositoryParams): Observable<PaginatedResult<T>>;
}
