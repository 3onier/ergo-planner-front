import { Routes } from '@angular/router';
import {DoctorListCard} from './components/doctor-list-card/doctor-list-card';
import {DoctorDetail} from './components/doctor-detail/doctor-detail';
import {Dashboard} from './components/dashboard/dashboard';
import {PatientList} from './components/patient-list/patient-list';
import {PatientDetail} from './components/patient-detail/patient-detail';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    pathMatch: "full"
  },
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
  },
  {
    path: 'patient-list',
    component: PatientList
  },
  {
    path: 'patient-create',
    component: PatientDetail
  },
  {
    path: 'patient-detail/:id',
    component: PatientDetail
  }
];
