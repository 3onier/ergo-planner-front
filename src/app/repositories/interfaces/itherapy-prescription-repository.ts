import {Observable} from 'rxjs';
import {TherapyPrescription} from '../../models/therapy-prescription';
import {PaginatedResult} from '../../common/classes/paginated-result';
import {RepositoryParams} from '../../common/interfaces/repository-params';
import {InjectionToken} from '@angular/core';

export interface ITherapyPrescriptionRepository {
  getAllTherapyPrescription(options?: RepositoryParams): Observable<PaginatedResult<TherapyPrescription>>;
  getTherapyPrescriptionById(id: number, options?: RepositoryParams): Observable<TherapyPrescription>;
  getTherapyPrescriptionsByPatientId(patientId: number, options?: RepositoryParams): Observable<PaginatedResult<TherapyPrescription>>;
  saveTherapyPrescription(tp: TherapyPrescription, options?: RepositoryParams): Observable<TherapyPrescription>;
  deleteTherapyPrescription(tp: TherapyPrescription, options?: RepositoryParams): Observable<void>;
}

export const THERAPY_PRESCRIPTION_REPOSITORY = new InjectionToken<ITherapyPrescriptionRepository>('TherapyPrescriptionRepository');
