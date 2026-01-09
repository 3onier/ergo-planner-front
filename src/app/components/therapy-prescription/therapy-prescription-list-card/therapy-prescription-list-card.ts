import { Component } from '@angular/core';
import {TherapyPrescriptionList} from '../therapy-prescription-list/therapy-prescription-list';
import {RouterLink} from '@angular/router';
import {TherapyPrescriptionDetail} from '../therapy-prescription-detail/therapy-prescription-detail';

@Component({
  selector: 'app-therapy-prescription-list-card',
  imports: [
    TherapyPrescriptionList,
    RouterLink
  ],
  templateUrl: './therapy-prescription-list-card.html',
  styleUrl: './therapy-prescription-list-card.css',
})
export class TherapyPrescriptionListCard {

  protected readonly TherapyPrescriptionDetail = TherapyPrescriptionDetail;
}
