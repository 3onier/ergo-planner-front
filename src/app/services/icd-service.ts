import {inject, Injectable} from '@angular/core';
import {HttpIcdCodeRepository} from '../repositories/http/http-icd-code-repository';
import {ISearchService} from './interfaces/isearch-service';
import {IcdCode} from '../models/icd-code';
import {map, Observable} from 'rxjs';
import {SearchResult, SearchResults} from '../common/interfaces/search-result';
import {PaginatedResult} from '../common/classes/paginated-result';
import {RepositoryParams} from '../common/interfaces/repository-params';

@Injectable({
  providedIn: 'root',
})
export class IcdService implements ISearchService<IcdCode>{
  private icdRepository = inject(HttpIcdCodeRepository);

  private convertToSearchResults(icdCodes: Array<IcdCode>): SearchResults<IcdCode>{
    return icdCodes.map( (code: IcdCode) => {
      console.log(code);
      return {
        title: code.searchResultTitle(),
        details: code.description,
        data: code
      } as SearchResult<IcdCode>
    })
  }

  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<SearchResult<IcdCode>>> {
    return this.icdRepository.searchIdcCode(txt, {page: options?.page}).pipe(
      map( (pageRes: PaginatedResult<IcdCode>) => {
        return new PaginatedResult<SearchResult<IcdCode>>({
          ...pageRes,
          results: this.convertToSearchResults(pageRes.results || [])
        })
      })
    )
  }

}
