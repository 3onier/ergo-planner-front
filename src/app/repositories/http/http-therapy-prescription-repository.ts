import { Injectable } from '@angular/core';
import {AbstractHttpRepository} from './abstract-http-repository';
import {TherapyPrescription, TherapyPrescriptions} from '../../models/therapy-prescription';
import {ITherapyPrescriptionRepository} from '../interfaces/itherapy-prescription-repository';
import {catchError, map, Observable} from "rxjs";
import { PaginatedResult } from "../../common/classes/paginated-result";
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpTherapyPrescriptionRepository extends AbstractHttpRepository<TherapyPrescription> implements ITherapyPrescriptionRepository {

  private url = this.baseApiUrl + "therapy-prescription/";

  static hydrateOne(tp: Partial<TherapyPrescription>): TherapyPrescription{
    // hydrate date
    if(tp.issue_date)
      tp.issue_date = new Date(tp.issue_date)
    return new TherapyPrescription(tp);
  }

  static hydrateAll(tps: Partial<TherapyPrescription>[]): Array<TherapyPrescription>{
    return tps.map(HttpTherapyPrescriptionRepository.hydrateOne);
  }

  static hydratePage(res: PaginatedResult<TherapyPrescription>): PaginatedResult<TherapyPrescription>{
    if(res.results)
      res.results = HttpTherapyPrescriptionRepository.hydrateAll(res.results);
    return res;
  }

  getAllTherapyPrescription(options?: RepositoryParams): Observable<PaginatedResult<TherapyPrescription>> {
    let params = this.repositoryOptionsToHttpParams(options);
    return this.httpClient.get<PaginatedResult<TherapyPrescription>>(this.url,{
      params: params
    }).pipe(
      map(HttpTherapyPrescriptionRepository.hydratePage),
      catchError(this.convertToError)
    );
  }
  getTherapyPrescriptionById(id: number, options?: RepositoryParams): Observable<TherapyPrescription> {
    return this.httpClient.get<TherapyPrescription>(this.url + id).pipe(
      map(HttpTherapyPrescriptionRepository.hydrateOne),
      catchError(this.convertToError)
    )
  }
  getTherapyPrescriptionsByPatientId(patientId: number, options?: RepositoryParams): Observable<PaginatedResult<TherapyPrescription>> {
    let params = this.repositoryOptionsToHttpParams(options);
    return this.httpClient.get<PaginatedResult<TherapyPrescription>>(this.url, {params: params})
      .pipe(
        map(HttpTherapyPrescriptionRepository.hydratePage),
        catchError(this.convertToError)
      )
  }
  saveTherapyPrescription(tp: TherapyPrescription, options?: RepositoryParams): Observable<TherapyPrescription> {
    // check if there is an id or not
    if(tp.id){
      return this.httpClient.put<TherapyPrescription>(this.url + tp.id, tp)
        .pipe(
          map(HttpTherapyPrescriptionRepository.hydrateOne),
          catchError(this.convertToError)
        );
    } else {
      return this.httpClient.post<TherapyPrescription>(this.url, tp)
        .pipe(
          map(HttpTherapyPrescriptionRepository.hydrateOne),
          catchError(this.convertToError)
        );
    }
  }
  deleteTherapyPrescription(tp: TherapyPrescription, options?: RepositoryParams): Observable<void> {
    return this.httpClient.delete<void>(this.url + tp.id).pipe(
      catchError(this.convertToError)
    );
  }

}
