import { Injectable } from '@angular/core';
import {IIcdCodeRepository} from '../interfaces/iicd-code-repository';
import {AbstractHttpRepository} from './abstract-http-repository';
import {IcdCode} from '../../models/icd-code';
import {catchError, map, Observable} from "rxjs";
import { RepositoryParams } from "../../common/interfaces/repository-params";
import {HttpParams} from '@angular/common/http';
import {PaginatedResult} from '../../common/classes/paginated-result';

@Injectable({
  providedIn: 'root',
})
export class HttpIcdCodeRepository extends AbstractHttpRepository<IcdCode> implements IIcdCodeRepository {
  private apiUrl = this.baseApiUrl + "icd/"

    searchIdcCode(search_string: string, options?: RepositoryParams): Observable<PaginatedResult<IcdCode>> {
      let httpParams = new HttpParams();
      httpParams = httpParams.append("q", search_string);
      httpParams = httpParams.append("page", options?.page || 1);
      return this.httpClient.get<PaginatedResult<IcdCode>>(
        this.apiUrl + "search/",
        {
          params: httpParams
        }
      ).pipe(
        catchError( (e) => this.convertToError(e) ),
        map( (res: PaginatedResult<IcdCode>) => {
          let out = new PaginatedResult<IcdCode>(res);
          out.results = res.results?.map( (e) => new IcdCode(e) );
          return out;
        })
      )
    }

}
