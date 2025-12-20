import { Component } from '@angular/core';
import {DoctorListCard} from '../doctor-list-card/doctor-list-card';
import {PatientList} from '../patient-list/patient-list';
import {PatientListCard} from '../patient-list-card/patient-list-card';

@Component({
  selector: 'app-dashboard',
  imports: [
    DoctorListCard,
    PatientListCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
