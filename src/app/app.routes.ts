import { Routes } from '@angular/router';
import {DoctorListCard} from './components/doctor/doctor-list-card/doctor-list-card';
import {DoctorDetail} from './components/doctor/doctor-detail/doctor-detail';
import {Dashboard} from './components/dashboard/dashboard';
import {PatientList} from './components/patient/patient-list/patient-list';
import {PatientDetail} from './components/patient/patient-detail/patient-detail';
import {TherapyPrescriptionDetail} from './components/therapy-prescription/therapy-prescription-detail/therapy-prescription-detail';
import {TherapyPrescriptionList} from './components/therapy-prescription/therapy-prescription-list/therapy-prescription-list';

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
  },
  {
    path: 'therapy-prescription-detail/:id',
    component: TherapyPrescriptionDetail
  },
  {
    path: 'therapy-prescription-create',
    component: TherapyPrescriptionDetail
  },
  {
    path: 'therapy-prescription-list',
    component: TherapyPrescriptionList
  }
];
