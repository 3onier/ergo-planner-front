import {Doctor} from '../../models/doctor';
import {Observable} from 'rxjs';

export interface IDoctorRepository {
  getAllDoctors(): Observable<Array<Doctor>>;
  getDoctorById(id: number): Observable<Doctor>;
  saveDoctor(dr: Doctor): Observable<Doctor>;
  findDoctorsByLastName(lastName: string): Observable<Array<Doctor>>;
  findDoctorsByFirstName(firstName: string): Observable<Array<Doctor>>;
}
