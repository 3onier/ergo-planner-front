import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {DoctorService} from '../../../services/doctor-service';
import {Doctor} from '../../../models/doctor';
import {RouterLink} from '@angular/router';
import {PaginatedResult} from '../../../common/classes/paginated-result';
import {environment} from '../../../../environments/environment';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {PageSizeDropdown} from '../../generic/page-size-dropdown/page-size-dropdown';

@Component({
  selector: 'app-doctor-list',
  imports: [
    RouterLink,
    NgbPagination,
    PageSizeDropdown
  ],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit{

  private doctorService = inject(DoctorService);

  // manage loading and everything here
  public isLoading = computed( () => false );
  public isDoctorsLoading = signal(true);

  // data
  public doctorPage = signal<PaginatedResult<Doctor> | undefined>(undefined)
  public doctors = computed( () => this.doctorPage()?.results || [] );

  public page = signal(1);
  public pageSize = signal(environment.DEFAULT_PAGE_SIZE);

  ngOnInit() {
    this.loadDoctorPage(this.page());
  }

  loadDoctorPage(page: number){
    this.isDoctorsLoading.set(true);
    this.doctorService.getAllDoctors({
      page: this.page(),
      page_size: this.pageSize()
    }).subscribe(
      (page) => {
        this.doctorPage.set(page);
        this.isDoctorsLoading.set(false);
      }
    )
  }

  setPage(page: number){
    this.page.set(page);
    this.loadDoctorPage(page);
  }

  setPageSize(pageSize: number){
    this.pageSize.set(pageSize);
    this.setPage(1);
  }

}
