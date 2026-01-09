import {Observable} from 'rxjs';
import {Patient, Patients} from '../../models/patient';
import {InjectionToken} from '@angular/core';
import {PaginatedResult} from '../../common/classes/paginated-result';
import {RepositoryParams} from '../../common/interfaces/repository-params';

export interface IPatientRepository{
  getAllPatients(options?: RepositoryParams): Observable<PaginatedResult<Patient>>;
  getPatientById(id: number, options?: RepositoryParams): Observable<Patient>;
  findPatientByFirstName(firstName: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>>;
  findPatientByLastName(lastName: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>>;
  savePatient(p: Patient): Observable<Patient>;
  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<Patient>>;
}

export const PATIENT_REPOSITORY = new InjectionToken<IPatientRepository>('PatientRepository');
