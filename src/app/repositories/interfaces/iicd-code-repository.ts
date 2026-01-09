import {Observable} from 'rxjs';
import {IcdCode} from '../../models/icd-code';
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {PaginatedResult} from '../../common/classes/paginated-result';
import {InjectionToken} from '@angular/core';

export interface IIcdCodeRepository{
  searchIdcCode(search_string: string, options?: RepositoryParams): Observable<PaginatedResult<IcdCode>>
}

export const ICD_CODE_REPOSITORY = new InjectionToken<IIcdCodeRepository>('ICDRepository');
