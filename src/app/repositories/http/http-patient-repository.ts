import { Injectable } from '@angular/core';
import {IPatientRepository} from '../interfaces/ipatient-repository';
import {catchError, map, Observable} from "rxjs";
import { Patients, Patient } from "../../models/patient";
import {AbstractHttpRepository} from './abstract-http-repository';
import {HttpParams} from '@angular/common/http';
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {PaginatedResult} from '../../common/classes/paginated-result';

@Injectable({
  providedIn: 'root',
})
export class HttpPatientRepository extends AbstractHttpRepository<Patient> implements IPatientRepository {

  apiUrl = this.baseApiUrl + "patients/"

  static convertDates(p: Object): Object {
    if('date_birth' in p){
      let oldDate = p.date_birth;
      p.date_birth = new Date(oldDate as string);
    }
    return p;
  }

  static convertDateArr(ps: Object[]): Object[]{
    return ps.map(HttpPatientRepository.convertDates);
  }

  static hydrateOne(p: Partial<Patient>): Patient{
    p = HttpPatientRepository.convertDates(p);
    return new Patient(p)
  }

  static hydrateArr(ps: Partial<Patient>[]): Patient[]{
    return ps.map(HttpPatientRepository.hydrateOne);
  }

  static hydratePage(page: PaginatedResult<Patient>): PaginatedResult<Patient>{
    if(page.results)
      page.results = HttpPatientRepository.hydrateArr(page.results);
    return page;
  }

  getAllPatients(options?: RepositoryParams): Observable<PaginatedResult<Patient>> {
    let params = this.repositoryOptionsToHttpParams(options);
    return this.httpClient.get(this.apiUrl, {params: params}).pipe(
      map(HttpPatientRepository.hydratePage),
      catchError((err) => this.convertToError(err) )
    );
  }

  getPatientById(id: number, options?: RepositoryParams): Observable<Patient> {
    return this.httpClient.get(this.apiUrl + id).pipe(
      map(HttpPatientRepository.hydrateOne),
      catchError((err) => this.convertToError(err) )
    );
  }

  findPatientByFirstName(firstName: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>> {
    let params = new HttpParams();
    params = params.append("first_name", firstName);
    return this.search(params);
  }

  findPatientByLastName(lastName: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>> {
    let params = new HttpParams();
    params = params.append("last_name", lastName);
    return this.search(params);
  }

  savePatient(p: Patient): Observable<Patient> {
    if(p.id === undefined){
      return this.httpClient.post(this.apiUrl, p).pipe(
        map(HttpPatientRepository.hydrateOne),
        catchError((err) => this.convertToError(err) )
      );
    }else {
      return this.httpClient.patch(this.apiUrl + p.id, p).pipe(
        map(HttpPatientRepository.hydrateOne),
        catchError((err) => this.convertToError(err) )
      );
    }
  }

  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>> {
    let params = this.repositoryOptionsToHttpParams(options);
    params = params.append("q", txt);
    return this.search(params);
  }

  private search(params: HttpParams, options?: RepositoryParams): Observable<PaginatedResult<Patient>>{
    return this.httpClient.get(this.apiUrl + "search", {
      params: params,
    }).pipe(
      catchError( (e) => this.convertToError(e)),
      map(HttpPatientRepository.hydratePage)
    )
  }

}
