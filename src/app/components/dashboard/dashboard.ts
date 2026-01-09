import { Component } from '@angular/core';
import {DoctorListCard} from '../doctor/doctor-list-card/doctor-list-card';
import {PatientList} from '../patient/patient-list/patient-list';
import {PatientListCard} from '../patient/patient-list-card/patient-list-card';
import {
  TherapyPrescriptionListCard
} from '../therapy-prescription/therapy-prescription-list-card/therapy-prescription-list-card';

@Component({
  selector: 'app-dashboard',
  imports: [
    DoctorListCard,
    PatientListCard,
    TherapyPrescriptionListCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
