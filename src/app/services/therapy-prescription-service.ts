import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TherapyPrescription, TherapyPrescriptions} from '../models/therapy-prescription';
import {PaginatedResult} from '../common/classes/paginated-result';
import {HttpTherapyPrescriptionRepository} from '../repositories/http/http-therapy-prescription-repository';
import {RepositoryParams} from '../common/interfaces/repository-params';

@Injectable({
  providedIn: 'root',
})
export class TherapyPrescriptionService {
  protected therapyPrescriptionRepository = inject(HttpTherapyPrescriptionRepository);

  public getAllTherapyPrescription(options?: RepositoryParams): Observable<PaginatedResult<TherapyPrescription>>{
    return this.therapyPrescriptionRepository.getAllTherapyPrescription(options);
  }

  public getTherapyPrescriptionById(id: number, options?: RepositoryParams): Observable<TherapyPrescription>{
    return this.therapyPrescriptionRepository.getTherapyPrescriptionById(id, options);
  }

  public saveTherapyPrescription(tp: TherapyPrescription, options?: RepositoryParams): Observable<TherapyPrescription>{
    return this.therapyPrescriptionRepository.saveTherapyPrescription(tp, options);
  }

}
