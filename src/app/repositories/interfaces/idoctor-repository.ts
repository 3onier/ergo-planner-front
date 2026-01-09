import {Doctor} from '../../models/doctor';
import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {ISearchService} from '../../services/interfaces/isearch-service';
import {ISearchRepository} from './isearch-repository';
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {PaginatedResult} from '../../common/classes/paginated-result';

export interface IDoctorRepository extends ISearchRepository<Doctor>{
  getAllDoctors(options?: RepositoryParams): Observable<PaginatedResult<Doctor>>;
  getDoctorById(id: number, options?: RepositoryParams): Observable<Doctor>;
  saveDoctor(dr: Doctor, options?: RepositoryParams): Observable<Doctor>;
  findDoctorsByLastName(lastName: string, options?: RepositoryParams): Observable<PaginatedResult<Doctor>>;
  findDoctorsByFirstName(firstName: string, options?: RepositoryParams): Observable<PaginatedResult<Doctor>>;
}

export const DOCTOR_REPOSITORY = new InjectionToken<IDoctorRepository>('DoctorRepository');
