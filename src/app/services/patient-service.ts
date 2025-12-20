import {inject, Injectable} from '@angular/core';
import {IPatientRepository} from '../repositories/interfaces/ipatient-repository';
import {LocalPatientRepository} from '../repositories/local/local-patient-repository';
import {Observable} from 'rxjs';
import {Patient, Patients} from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patientRepo: IPatientRepository = inject(LocalPatientRepository);

  getAllPatients(): Observable<Patients>{
    return this.patientRepo.getAllPatients();
  }

  getPatientById(id: number): Observable<Patient>{
    return this.patientRepo.getPatientById(id);
  }

  savePatient(p: Patient): Observable<Patient>{
    return this.patientRepo.savePatient(p);
  }

}
