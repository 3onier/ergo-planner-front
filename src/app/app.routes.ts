import { Routes } from '@angular/router';
import {DoctorListCard} from './components/doctor-list-card/doctor-list-card';
import {DoctorDetail} from './components/doctor-detail/doctor-detail';

export const routes: Routes = [
  {
    path: 'doctor-list',
    component: DoctorListCard
  },
  {
    path: 'doctor-create',
    component: DoctorDetail
  },
  {
    path: 'doctor-detail/:id',
    component: DoctorDetail
  }
];
