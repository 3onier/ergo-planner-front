import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {PatientService} from '../../../services/patient-service';
import {Patient, Patients} from '../../../models/patient';
import {DatePipe} from '@angular/common';
import {DateFormattingPipe} from '../../../common/pipes/date-formatting-pipe';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {PaginatedResult} from '../../../common/classes/paginated-result';
import {environment} from '../../../../environments/environment';
import {PageSizeDropdown} from '../../generic/page-size-dropdown/page-size-dropdown';

@Component({
  selector: 'app-patient-list',
  imports: [
    RouterLink,
    NgbPagination,
    PageSizeDropdown
  ],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit{

  public patientPage = signal<PaginatedResult<Patient> | undefined>(undefined);
  public patients = computed( () => this.patientPage()?.results || [] );
  public page = signal(1);
  public pageSize = signal(environment.DEFAULT_PAGE_SIZE);

  public isLoading = computed( () => true );
  public isPatientsLoading = signal(true);

  private patientService = inject(PatientService);

  ngOnInit() {
    this.loadPatientPage(this.page())
  }

  loadPatientPage(page: number){
    this.isPatientsLoading.set(true);
    this.patientService.getAllPatients({
      page: page,
      page_size: this.pageSize()
    }).subscribe({
      next: (page) => {
        this.patientPage.set(page);
        this.isPatientsLoading.set(false);
      }
    })
  }

  public getPatientDetail(p: Patient): string{
    let parts: Array<string> = [];
    let dateFormattingPipe = new DateFormattingPipe();

    if(p.date_birth)
      parts.push(dateFormattingPipe.transform(p.date_birth));
    if(p.city)
      parts.push(p.city);
    return parts.join(", ");
  }

  setPage(page: number){
    this.page.set(page);
    this.loadPatientPage(page);
  }

  setPageSize(size: number){
    this.pageSize.set(size);
    this.setPage(1);
  }

}
