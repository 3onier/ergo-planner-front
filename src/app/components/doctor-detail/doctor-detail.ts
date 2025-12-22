import {Component, computed, inject, OnInit, signal, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Doctor} from '../../models/doctor';
import {DoctorService} from '../../services/doctor-service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../services/toast-service';
import {ModelFormWithSubmit} from '../abstract/ModelFormWithSubmit';

@Component({
  selector: 'app-doctor-detail',
  imports: [
    FormsModule
  ],
  templateUrl: './doctor-detail.html',
  styleUrl: './doctor-detail.css',
})
export class DoctorDetail implements OnInit, ModelFormWithSubmit<Doctor>{ //

    @Input() public model?: Doctor;
    @Output() public submitEvent: EventEmitter<Doctor> = new EventEmitter<Doctor>();

    isWritable = signal(true);

    private doctorService = inject(DoctorService);
    private activatedRoute = inject(ActivatedRoute)
    private toastService = inject(ToastService);

    public isLoading = computed( () => this.isDoctorLoading() );
    public isDoctorLoading = signal(true);

    ngOnInit() {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id !== null){
        this.loadDoctorById(parseInt(id));
      }else if(this.model === undefined){
        this.isDoctorLoading.set(false);
        this.model = new Doctor();
      } else {
        this.toastService.displayToast({
          text: "Arzt konnte nicht geladen werden",
          color: "danger"
        });
      }
    }

    loadDoctorById(id: number){
      this.doctorService.getDoctorById(id).subscribe(
        {
          next: (dr) => {
            this.model = dr;
            this.isDoctorLoading.set(false);
            this.isWritable.set(false);
          }
        }
      );
    }

    onSubmit(){
      if(this.model === undefined)
        return;
      this.doctorService.saveDoctor(this.model).subscribe({
        next: (dr) => {
          this.model = dr;
          this.submitEvent.emit(dr);
          this.toastService.displayToast({
            text: "Arzt wurde gespeichert",
            color: "success"
          });
          this.isWritable.set(false);
        }
      })
    }

    toggleWritable(){
      this.isWritable.set(!this.isWritable());
    }
}
