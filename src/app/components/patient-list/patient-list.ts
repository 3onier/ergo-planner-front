import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {PatientService} from '../../services/patient-service';
import {Patient, Patients} from '../../models/patient';
import {DatePipe} from '@angular/common';
import {DateFormattingPipe} from '../../common/pipes/date-formatting-pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-patient-list',
  imports: [
    DateFormattingPipe,
    RouterLink
  ],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit{

  public patients: Patients = [];

  public isLoading = computed( () => true );
  public isPatientsLoading = signal(true);

  private patientService = inject(PatientService);

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients(){
    this.patientService.getAllPatients().subscribe({
      next: (ps) => {
        this.patients = ps;
        this.isPatientsLoading.set(false);
      }
    })
  }

  public getPatientDetail(p: Patient): string{
    let parts: Array<string> = [];
    let dateFormattingPipe = new DateFormattingPipe()

    if(p.date_birth)
      parts.push(dateFormattingPipe.transform(p.date_birth))
    if(p.city)
      parts.push(p.city)
    return parts.join(", ");
  }

}
