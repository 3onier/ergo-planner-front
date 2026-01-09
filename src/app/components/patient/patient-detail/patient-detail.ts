import {Component, computed, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Patient} from '../../../models/patient';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../../../services/patient-service';
import {ToastService} from '../../../services/toast-service';
import {NgbDatepicker, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {ModelFormWithSubmit} from '../../abstract/ModelFormWithSubmit';

@Component({
  selector: 'app-patient-detail',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgbInputDatepicker
  ],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})
export class PatientDetail extends ModelFormWithSubmit<Patient> implements OnInit{

  @Input() model?: Patient;
  @Output() submitEvent = new EventEmitter<Patient>();

  isWritable = signal(true);

  isLoading = computed( () => true );
  isLoadingPatient = signal(true);

  private activatedRoute = inject(ActivatedRoute);
  private patientService = inject(PatientService);
  private toastService = inject(ToastService);


  ngOnInit() {
    // get id or null from route
    let idOrNull = this.activatedRoute.snapshot.paramMap.get("id");
    // check if input is given first
    if(this.model !== undefined){
      this.isLoadingPatient.set(false);
      this.isWritable.set(true);
    }else if (idOrNull !== null){
      this.patientService.getPatientById(parseInt(idOrNull)).subscribe({
        next: p => {
          this.model = p;
          this.isLoadingPatient.set(false);
          this.isWritable.set(false);
        },
        error: (e) => this.toastService.displayToast({text: "Patient konnte nicht geladen werden", color: "danger"})
      })
    }else {
      this.model = new Patient();
      this.isLoadingPatient.set(false);
      this.isWritable.set(true);
    }
  }

  onSubmit(){
    if(this.model===undefined)
      return
    this.patientService.savePatient(this.model).subscribe({
      next: (p) => {
        this.model = p;
        this.submitEvent.emit(p);
        this.toastService.displayToast({
          text: "Patient wurde gespeichert",
          color: "success"
        })
        this.isWritable.set(false);
      },
      error: (err) => {
        this.toastService.displayToast({
          color: "danger",
          text: "Patient konnte nicht gespeichert werden"
        });
      }
    })
  }

  toggleWritable(){
    this.isWritable.set(!this.isWritable())
  }

}
