import {Component, computed, inject, Input, OnInit, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Patient} from '../../models/patient';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../../services/patient-service';
import {ToastService} from '../../services/toast-service';
import {NgbDatepicker, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-detail',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgbInputDatepicker,
    NgbDatepicker
  ],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})
export class PatientDetail implements OnInit{

  @Input() patient = new Patient()

  isWritable = signal(true);

  isLoading = computed( () => true );
  isLoadingPatient = signal(true);

  private activatedRoute = inject(ActivatedRoute);
  private patientService = inject(PatientService);
  private toastService = inject(ToastService);


  ngOnInit() {
    // check if parameter ID is given
    let idStrOrNull = this.activatedRoute.snapshot.paramMap.get("id");
    if (idStrOrNull != null){
      let id = parseInt(idStrOrNull);
      this.patientService.getPatientById(id).subscribe({
        next: (p) => {
          this.patient = p;
          this.isLoadingPatient.set(false);
          this.isWritable.set(false);
        },
        error: (e) => {
          this.toastService.displayToast({
            color: 'danger',
            text: 'Patient konnte nicht geladen oder gefunden werden'
          })
        }
      })
    }else {
      this.isLoadingPatient.set(false);
      this.isWritable.set(true);
    }
  }

  save(){
    this.patientService.savePatient(this.patient).subscribe({
      next: (p) => {
        this.patient = p;
        this.toastService.displayToast({
          text: "Patient wurde gespeichert",
          color: "success"
        })
        this.isWritable.set(false);
      }
    })
  }

  toggleWritable(){
    this.isWritable.set(!this.isWritable())
  }

}
