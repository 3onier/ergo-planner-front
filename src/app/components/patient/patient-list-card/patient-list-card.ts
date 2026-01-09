import { Component } from '@angular/core';
import {PatientList} from '../patient-list/patient-list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-patient-list-card',
  imports: [
    PatientList,
    RouterLink
  ],
  templateUrl: './patient-list-card.html',
  styleUrl: './patient-list-card.css',
})
export class PatientListCard {

  protected readonly PatientList = PatientList;
}
