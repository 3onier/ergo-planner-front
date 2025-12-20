import {Observable} from 'rxjs';
import {Patient, Patients} from '../../models/patient';

export interface IPatientRepository{
  getAllPatients(): Observable<Patients>;
  getPatientById(id: number): Observable<Patient>;
  findPatientByFirstName(firstName: string): Observable<Patients>;
  findPatientByLastName(lastName: string): Observable<Patients>;
  savePatient(p: Patient): Observable<Patient>;
}
