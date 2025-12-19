import { Component } from '@angular/core';
import {DoctorList} from '../doctor-list/doctor-list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-doctor-list-card',
  imports: [
    DoctorList,
    RouterLink
  ],
  templateUrl: './doctor-list-card.html',
  styleUrl: './doctor-list-card.css',
})
export class DoctorListCard {

}
