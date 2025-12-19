import { Injectable } from '@angular/core';
import {LocalDoctorRepository} from '../repositories/local/local-doctor-repository';
import {Doctor} from '../models/doctor';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorRepository = new LocalDoctorRepository();

  public getAllDoctors(): Observable<Array<Doctor>>{
    return this.doctorRepository.getAllDoctors();
  }

  public getDoctorById(id: number): Observable<Doctor>{
    return this.doctorRepository.getDoctorById(id);
  }

  public saveDoctor(dr: Doctor): Observable<Doctor>{
    return this.doctorRepository.saveDoctor(dr);
  }

}
