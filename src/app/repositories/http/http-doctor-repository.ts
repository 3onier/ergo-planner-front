import { Injectable } from '@angular/core';
import {IDoctorRepository} from '../interfaces/idoctor-repository';
import {AbstractHttpRepository} from './abstract-http-repository';
import {catchError, map, Observable} from "rxjs";
import { Doctor } from "../../models/doctor";
import {Patients} from '../../models/patient';
import {HttpParams} from '@angular/common/http';
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {PaginatedResult} from '../../common/classes/paginated-result';

@Injectable({
  providedIn: 'root',
})
export class HttpDoctorRepository extends AbstractHttpRepository<Doctor> implements IDoctorRepository
{

  private url = this.baseApiUrl + "doctors/";

  static hydrateOne(dr: Partial<Doctor>): Doctor{
    return new Doctor(dr);
  }

  static hydrateArr(drs: Partial<Doctor>[]): Doctor[]{
    return drs.map(HttpDoctorRepository.hydrateOne);
  }

  static hydratePage(page: PaginatedResult<Doctor>){
    if(page.results)
      page.results = HttpDoctorRepository.hydrateArr(page.results);
    return page;
  }

  getAllDoctors(options?: RepositoryParams): Observable<PaginatedResult<Doctor>> {
    let httpParams = this.repositoryOptionsToHttpParams(options);
    return this.httpClient.get<PaginatedResult<Doctor>>(this.url, {params: httpParams}).pipe(
      catchError( ( e ) => this.convertToError(e) ),
      map(HttpDoctorRepository.hydratePage)
    );
  }
  getDoctorById(id: number, options?: RepositoryParams): Observable<Doctor> {
    let httpParams = this.repositoryOptionsToHttpParams(options);
    return this.httpClient.get(this.url + id, {params: httpParams}).pipe(
      catchError( ( e ) => this.convertToError(e) ),
      map(HttpDoctorRepository.hydrateOne)
    );
  }
  saveDoctor(dr: Doctor, options?: RepositoryParams): Observable<Doctor> {
    let url = this.url;
    if(dr.id){
      url += dr.id;
      return this.httpClient.put(url, dr).pipe(
        catchError( (e) => this.convertToError(e) ),
        map( (dr) => new Doctor(dr) )
      );
    }else {
      return this.httpClient.post(url, dr).pipe(
        catchError( (e) => this.convertToError(e) ),
        map( (dr) => new Doctor(dr) )
      );
    }
  }

  findDoctorsByLastName(lastName: string, options?: RepositoryParams): Observable<PaginatedResult<Doctor>> {
    let params = this.repositoryOptionsToHttpParams(options);
    params = params.append("last_name", lastName);
    return this.search(params);
  }

  findDoctorsByFirstName(firstName: string, options?: RepositoryParams): Observable<PaginatedResult<Doctor>> {
    let params = this.repositoryOptionsToHttpParams(options);
    params = params.append("first_name", firstName);
    return this.search(params);
  }

  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<Doctor>> {
    let params = this.repositoryOptionsToHttpParams(options);
    params = params.append("q", txt);
    return this.search(params);
  }

  private search(params: HttpParams): Observable<PaginatedResult<Doctor>>{
    return this.httpClient.get(this.url + "search", {
      params: params
    }).pipe(
      catchError( (e) => this.convertToError(e)),
      map(HttpDoctorRepository.hydratePage)
    )
  }

}
