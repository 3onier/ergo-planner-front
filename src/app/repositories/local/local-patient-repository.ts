import { Injectable } from '@angular/core';
import {IPatientRepository} from '../interfaces/ipatient-repository';
import {Observable, of, throwError} from "rxjs";
import { Patients, Patient } from "../../models/patient";
import {Doctor} from '../../models/doctor';
import {NotFoundException} from '../../common/exceptions/NotFoundException';

@Injectable({
  providedIn: 'root',
})
export class LocalPatientRepository implements IPatientRepository {

  private key = "patients";

  private convertDate(p: Patient){
    let dateString = p.date_birth as unknown as string;
    if(p.date_birth){
      p.date_birth = new Date(dateString);
    }
    return p;
  }

  private loadFromLocal(): Patients{
    let jsonString = window.localStorage.getItem(this.key) || "[]";
    return (JSON.parse(jsonString) as Patients).map(this.convertDate);
  }

  private saveToLocal(es: Patients){
    let jsonString = JSON.stringify(es);
    window.localStorage.setItem(this.key, jsonString);
  }

  getAllPatients(): Observable<Patients> {
      return of(this.loadFromLocal());
  }
  getPatientById(id: number): Observable<Patient> {
    let arr = this.loadFromLocal();
    let index = arr.findIndex( (e) => e.id == id );
    if (index == -1)
      return throwError( () => new NotFoundException());
    return of(arr[index]);
  }
  findPatientByFirstName(firstName: string): Observable<Patients> {
    let arr = this.loadFromLocal();
    let out = arr.filter((e) => e.first_name?.includes(firstName))
    return of(out);
  }
  findPatientByLastName(lastName: string): Observable<Patients> {
    let arr = this.loadFromLocal();
    let out = arr.filter((e) => e.last_name?.includes(lastName))
    return of(out);
  }
  savePatient(p: Patient): Observable<Patient> {
    let arr = this.loadFromLocal();
    let index = 0;
    if(p.id == undefined){
      index = Math.max(...arr.map( (e) => e.id || 0 ));
      if(index == null)
        index = 1
      p.id = index + 1;
      arr.push(p);
    }else {
      index = arr.findIndex( (e) => e.id == p.id );
      arr[index] = p;
    }
    this.saveToLocal(arr);
    return of(p)
  }

}
