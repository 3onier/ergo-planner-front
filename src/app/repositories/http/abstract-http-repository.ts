import {inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NotFoundException} from '../../common/exceptions/NotFoundException';
import {ObservableInput} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RepositoryParams} from '../../common/interfaces/repository-params';

export abstract class AbstractHttpRepository<T>{

  baseApiUrl = environment.API_URL;

  httpClient = inject(HttpClient);

  convertToError(err: any): ObservableInput<any>{
    if(err.status == 404){
      throw new NotFoundException();
    }
    throw new Error();
  }

  repositoryOptionsToHttpParams(options?: RepositoryParams): HttpParams{
    let output = new HttpParams();
    // page
    if(options?.page)
      output = output.append("page", options.page)
    // set size of page
    output = output.append("page_size", options?.page_size || environment.DEFAULT_PAGE_SIZE)
    return output;
  }

}
