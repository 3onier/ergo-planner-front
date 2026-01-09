import {inject, Injectable} from '@angular/core';
import {Doctor} from '../models/doctor';
import {catchError, map, Observable, of, pipe} from 'rxjs';
import {HttpDoctorRepository} from '../repositories/http/http-doctor-repository';
import {ISearchService} from './interfaces/isearch-service';
import {SearchResult, SearchResults} from "../common/interfaces/search-result";
import {PaginatedResult} from '../common/classes/paginated-result';
import {RepositoryParams} from '../common/interfaces/repository-params';
import {Patient} from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class DoctorService implements ISearchService<Doctor> {

  private doctorRepository = inject(HttpDoctorRepository);

  public getAllDoctors(options?: RepositoryParams): Observable<PaginatedResult<Doctor>>{
    return this.doctorRepository.getAllDoctors(options);
  }

  public getDoctorById(id: number, options?: RepositoryParams): Observable<Doctor>{
    return this.doctorRepository.getDoctorById(id, options);
  }

  public saveDoctor(dr: Doctor, options?: RepositoryParams): Observable<Doctor>{
    return this.doctorRepository.saveDoctor(dr, options);
  }

  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<SearchResult<Doctor>>> {
    return this.doctorRepository.searchFullText(txt, options).pipe(
      map(
        (page) => {
          let result = page.results?.map(
            (p) => {
              return {
                title: p.getListName(),
                data: p,
                details: p.city
              } as SearchResult<Doctor>
            }
          );
          page.results = [];
          let newPage = page as PaginatedResult<SearchResult<Doctor>>;
          newPage.results = result;
          return newPage;
        }
      )
    )
  }
}
