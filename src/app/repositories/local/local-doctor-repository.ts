import { Injectable } from '@angular/core';
import {IDoctorRepository} from '../interfaces/idoctor-repository';
import { Doctor } from "../../models/doctor";
import {delay, firstValueFrom, Observable, of} from 'rxjs';
import {NotFoundException} from '../../common/exceptions/NotFoundException';

@Injectable({
  providedIn: 'root',
})
export class LocalDoctorRepository implements IDoctorRepository {

    private key = "doctors";

    private loadDoctorsFromLocal(): Array<Doctor>{
      let jsonString = window.localStorage.getItem(this.key) || "[]";
      return JSON.parse(jsonString) as Array<Doctor>;
    }

    private saveDoctorsToLocal(drs: Array<Doctor>){
      let jsonString = JSON.stringify(drs);
      window.localStorage.setItem(this.key, jsonString);
    }

    getAllDoctors(): Observable<Array<Doctor>> {
        return of(this.loadDoctorsFromLocal()).pipe(delay(500));
    }
    getDoctorById(id: number): Observable<Doctor> {
      let doctors = this.loadDoctorsFromLocal();
      let index = doctors.findIndex( (d) => d.id == id );
      if(index == -1)
        throw new NotFoundException();
      return of(doctors[index]).pipe(delay(500));
    }
    saveDoctor(dr: Doctor): Observable<Doctor> {
      let doctors = this.loadDoctorsFromLocal();
      if (dr.id){
        let index = doctors.findIndex( (d) => d.id == dr.id );
        doctors[index] = dr;
      }
      else {
        let id = Math.max(...doctors.map(
          (d) => d.id || 0
        )) + 1;
        dr.id = id;
        doctors.push(dr);
      }
      this.saveDoctorsToLocal(doctors);
      return of(dr).pipe(delay(500))
    }
    findDoctorsByLastName(lastName: string): Observable<Array<Doctor>> {
        throw new Error("Method not implemented.");
    }
    findDoctorsByFirstName(firstName: string): Observable<Array<Doctor>> {
        throw new Error("Method not implemented.");
    }

}
