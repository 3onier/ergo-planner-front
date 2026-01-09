import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TherapyPrescriptionService} from '../../../services/therapy-prescription-service';
import {TherapyPrescription} from '../../../models/therapy-prescription';
import {PaginatedResult} from '../../../common/classes/paginated-result';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPagination
} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from '../../../models/patient';
import {Doctor} from '../../../models/doctor';
import {PatientService} from '../../../services/patient-service';
import {DateFormattingPipe} from '../../../common/pipes/date-formatting-pipe';
import {DoctorService} from '../../../services/doctor-service';
import {PageSizeDropdown} from '../../generic/page-size-dropdown/page-size-dropdown';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-therapy-prescription-list',
  imports: [
    NgbPagination,
    DateFormattingPipe,
    PageSizeDropdown
  ],
  templateUrl: './therapy-prescription-list.html',
  styleUrl: './therapy-prescription-list.css',
})
export class TherapyPrescriptionList implements OnInit{

  // data
  page: number = 1
  page_size?: number;
  therapyPrescriptionPage
    = signal<PaginatedResult<TherapyPrescription> | undefined>(undefined);
  therapyPrescriptions
    = computed<TherapyPrescription[]|undefined>( () => this.therapyPrescriptionPage()?.results )

  therapyPrescriptionIdPatientMap = signal(new Map<number, Patient>());
  therapyPrescriptionIdDoctorMap = signal(new Map<number, Doctor>());

  // loading animations
  isComponentLoading = computed( () => this.isLoading.list() || this.isLoading.patients() || this.isLoading.doctors() )
  numberPatientLoading = signal(0);
  numberDoctorLoading = signal(0);
  isLoading = {
    list: signal(false),
    patients: computed( () => this.numberPatientLoading() > 0 ),
    doctors: computed( () => this.numberDoctorLoading() > 0)
  }

  // services
  protected therapyPrescriptionService = inject(TherapyPrescriptionService);
  protected patientService = inject(PatientService);
  protected doctorService = inject(DoctorService);

  ngOnInit() {
    this.loadTherapyPrescriptions(this.page);
  }

  /**
   * load all the prescriptions of a single page
   *
   * @param page
   */
  loadTherapyPrescriptions(page: number){
    // make list load again
    this.isLoading.list.set(true);
    this.therapyPrescriptionService.getAllTherapyPrescription({
      page: page,
      page_size: this.page_size
    }).subscribe({
      next: (tps) => {
        this.therapyPrescriptionPage.set(tps);
        this.isLoading.list.set(false);
        this.loadPatients();
        this.loadDoctors();
      }
    })
  }

  /**
   * Loads all the patients for all displayed therapy prescriptions
   */
  loadPatients(){
    // get all patient ids in the prescriptions
    let idsNeeded = this.therapyPrescriptions()?.map( (tp) => tp.patient );
    if(idsNeeded === undefined)
      return
    // make ids in there unique
    idsNeeded = idsNeeded.filter( (e, i) => idsNeeded?.indexOf(e) === i );
    // get all ids that are already loaded
    let idsLoaded = Array.from(this.therapyPrescriptionIdPatientMap().keys());
    // now remove all items that are in the ones already loaded
    idsNeeded = idsNeeded.filter( (e) => e != undefined && idsLoaded.indexOf(e) == -1);
    // set number of loading patients to the number of ids needed
    this.numberPatientLoading.set(idsNeeded.length);

    // now we can load all the patients for this
    for(let id of idsNeeded){
      if(id == undefined)
        continue;
      this.patientService.getPatientById(id).subscribe({
        next: (p) => {
            this.therapyPrescriptionIdPatientMap.update(
              (map) => {
                if(p.id === undefined)
                  return map
                return map.set(p.id, p)
              }
            );
            // lower number of patients loading
            this.numberPatientLoading.update( (n) => n - 1 );
        }
      });
    }
  }

  loadDoctors(){
    // get all patient ids in the prescriptions
    let idsNeeded = this.therapyPrescriptions()?.map( (tp) => tp.doctor );
    if(idsNeeded === undefined)
      return
    // make ids in there unique
    idsNeeded = idsNeeded.filter( (e, i) => idsNeeded?.indexOf(e) === i );
    // get all ids that are already loaded
    let idsLoaded = Array.from(this.therapyPrescriptionIdDoctorMap().keys());
    // now remove all items that are in the ones already loaded
    idsNeeded = idsNeeded.filter( (e) => e != undefined && idsLoaded.indexOf(e) == -1);
    // set number of loading patients to the number of ids needed
    this.numberDoctorLoading.set(idsNeeded.length);

    // now we can load all the patients for this
    for(let id of idsNeeded){
      if(id == undefined)
        continue;
      this.doctorService.getDoctorById(id).subscribe({
        next: (dr) => {
          this.therapyPrescriptionIdDoctorMap.update(
            (map) => {
              if(dr.id === undefined)
                return map
              return map.set(dr.id, dr)
            }
          );
          // lower number of doctors loading
          this.numberDoctorLoading.update( (n) => n - 1 );
        }
      });
    }
  }

  /**
   * Set on page
   *
   * @param page page number
   */
  setPage(page: number){
    this.page = page;
    this.loadTherapyPrescriptions(page);
  }

  /**
   * Sets the page size of the list
   * and reload the list, with new size
   *
   * @param page_size numbers of elements of the page for results
   */
  setPageSize(page_size: number){
    this.setPage(1);
    this.page_size = page_size;
    this.loadTherapyPrescriptions(this.page);
  }

  protected readonly environment = environment;
}
