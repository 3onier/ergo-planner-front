import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {DoctorService} from '../../services/doctor-service';
import {Doctor} from '../../models/doctor';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  imports: [
    RouterLink
  ],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit{

  private doctorService = inject(DoctorService);

  // manage loading and everything here
  public isLoading = computed( () => false );
  public isDoctorsLoading = signal(true);

  public doctors: Array<Doctor> = [];

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors(){
    this.doctorService.getAllDoctors().subscribe(
      (drs) => {
        this.doctors = drs;
        this.isDoctorsLoading.set(false);
      }
    )
  }

}
