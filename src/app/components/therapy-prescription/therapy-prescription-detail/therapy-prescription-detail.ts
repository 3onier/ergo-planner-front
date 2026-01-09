import {
  Component,
  computed, ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  viewChild,
  ViewChild
} from '@angular/core';
import {TherapyPrescriptionService} from '../../../services/therapy-prescription-service';
import {ModelFormWithSubmit} from '../../abstract/ModelFormWithSubmit';
import {TherapyPrescription} from '../../../models/therapy-prescription';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../../services/toast-service';
import {FormsModule} from '@angular/forms';
import {SearchSelectModal} from '../../generic/search-select-modal/search-select-modal';
import {PatientService} from '../../../services/patient-service';
import {Patient} from '../../../models/patient';
import {DoctorService} from '../../../services/doctor-service';
import {Doctor} from '../../../models/doctor';
import {IcdCode} from '../../../models/icd-code';
import {IcdService} from '../../../services/icd-service';
import {DiagnosisGroup} from '../../../models/diagnosis-group';
import {DiagnosisGroupService} from '../../../services/diagnosis-group-service';
import {
  NgbDatepicker,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle, NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import {single} from 'rxjs';

@Component({
  selector: 'app-therapy-prescription-detail',
  imports: [
    FormsModule,
    SearchSelectModal,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbInputDatepicker
  ],
  templateUrl: './therapy-prescription-detail.html',
  styleUrl: './therapy-prescription-detail.css',
})
export class TherapyPrescriptionDetail extends ModelFormWithSubmit<TherapyPrescription> implements OnInit {

  @Input() model?: TherapyPrescription;
  @Output() submitEvent: EventEmitter<TherapyPrescription> = new EventEmitter<TherapyPrescription>();

  @ViewChild('patientSearch') searchSelectPatientModal = new SearchSelectModal<Patient>();
  @ViewChild('doctorSearch') searchSelectedDoctorModal = new SearchSelectModal<Doctor>();
  @ViewChild('icdSearch') searchSelectIcdCodeModal = new SearchSelectModal<IcdCode>();

  @ViewChild('icdInput') icdInput!: HTMLInputElement;

  helperInputs = {
    selectedDoctorString: signal(""),
    selectedPatientString: signal(""),
    idcCodAddString: signal("")
  }

  isTPLoading = signal(false);
  isDrLoading = signal(false);
  isPatientLoading = signal(false);
  isLoading = computed( () => {
    return this.isTPLoading()
      || this.isDrLoading()
      || this.isPatientLoading();
  } );
  isWritable = signal(false);

  protected therapyPrescriptionService = inject(TherapyPrescriptionService);
  protected patientService = inject(PatientService);
  protected doctorService = inject(DoctorService);
  protected activatedRoute = inject(ActivatedRoute);
  protected toastService = inject(ToastService);
  protected idcService = inject(IcdService);
  protected diagnosisGroupService = inject(DiagnosisGroupService);

  diagnosisGroups = signal<DiagnosisGroup[]|undefined>(undefined);
  diagnosisGroup = signal<DiagnosisGroup|undefined>(undefined);

  ngOnInit() {
    this.loadTherapyPrescription();
    this.loadDiagnoseGroups();
  }

  /**
   * Load the therapy prescription, i.e. if model is given, then only load that
   * if the ID is given my the url use that
   * if nothing is given create a new model
   */
  loadTherapyPrescription(){
    // get ID from the route
    let idStringOrNull = this.activatedRoute.snapshot.paramMap.get("id");
    // check if the Therapy prescription is set
    if(this.model !== undefined){
      this.isTPLoading.set(false);
    } if(idStringOrNull !== null){
      this.loadTpFromId(parseInt(idStringOrNull));
    } else {
      this.model = new TherapyPrescription();
      this.isTPLoading.set(false);
      this.isWritable.set(true);
    }
  }

  /**
   * Load therapy prescription from ID
   *
   * @param id id of the prescription
   */
  loadTpFromId(id: number){
    this.isTPLoading.set(true);
    this.isDrLoading.set(true);
    this.isPatientLoading.set(true);
    this.therapyPrescriptionService.getTherapyPrescriptionById(id).subscribe({
      next: tp => {
        this.model = tp;
        this.loadDoctor();
        this.loadPatient();
        this.isTPLoading.set(false);
      },
      error: err => {
        this.toastService.displayToast({
          color: 'danger',
          text: "Heilmittelverordnung konnte nicht geladen werden"
        });
      }
    });
  }

  /**
   * When form is submitted call this function
   *
   *
   */
  onSubmit(): void {
    if(!this.model)
      return
    this.therapyPrescriptionService.saveTherapyPrescription(this.model).subscribe({
      next: (tp) => {
        this.model = tp;
        this.toastService.displayToast({
          color: "success",
          text: "Heilmittelverordnung wurde erfolgreich gespeichert"
        });
        this.submitEvent.emit(tp);
      },
      error: (e) => {
        this.toastService.displayToast({
          color: "danger",
          text: "Heilmittelverordnung konnte nicht gespeichert werden"
        })
      }
    })
  }

  /**
   * Load patient data when patient is given in therapy prescription
   */
  loadPatient(){
    let id = this.model?.patient;
    if(!id)
      return
    this.patientService.getPatientById(id).subscribe({
      next: value => {
        this.patientSelected(value);
        this.isPatientLoading.set(false);
      }
    })
  }

  /**
   * Sets the selected patient
   *
   * @param p patient
   */
  patientSelected(p: Patient){
    this.helperInputs.selectedPatientString.set(p.last_name + ", " + p.first_name);
    if(this.model)
      this.model.patient = p.id;
  }

  /**
   * Load doctor data when patient is given in therapy prescription
   *
   */
  loadDoctor(){
    let id = this.model?.doctor;
    if(!id)
      return
    this.doctorService.getDoctorById(id).subscribe({
      next: value => {
        this.doctorSelected(value);
        this.isDrLoading.set(false);
      }
    })
  }

  /**
   * sets
   *
   * @param dr
   */
  doctorSelected(dr: Doctor){
    this.helperInputs.selectedDoctorString.set(dr.title + " " + dr.last_name + ", " + dr.first_name);
    if(this.model)
      this.model.doctor = dr.id;
  }

  /**
   * When ICD code is selected it fills the input field
   * for diagnosis code
   *
   * @param icdCode
   */
  icdSelected(icdCode: IcdCode){
    if(this.model) {
      if (this.model.diagnosis == undefined || this.model.diagnosis == ""){
        this.model.diagnosis = icdCode.description;
      } else {
        this.model.diagnosis += "\n" + icdCode.description;
      }
    }
    if(this.model?.icd_codes.findIndex( (c) => c == icdCode.toString() ) != -1)
      return
    this.model.icd_codes.push(icdCode.toString());
  }

  /**
   * Takes the input and adds it the therapy description
   */
  icdAdded(){
    let code = this.helperInputs.idcCodAddString();
    this.helperInputs.idcCodAddString.set("");
    // check if code is empty
    if(code.length == 0)
      return
    // check if code already exists
    if(this.model?.icd_codes.findIndex( (c) => c == code ) != -1)
      return
    this.model?.icd_codes.push(code);
  }

  /**
   * removes the diagnosis code from the therapy prescription
   *
   * @param code
   */
  icdRemove(code: string){
    if(this.model?.icd_codes){
      this.model.icd_codes = this.model.icd_codes.filter( (e) => e != code );
    }
  }

  /**
   * Loads initially all diagnose groups
   */
  loadDiagnoseGroups(){
    this.diagnosisGroupService.getDiagnosisGroups().subscribe({
      next: this.diagnosisGroups.set
    })
  }

  /**
   * selects and defines the diagnosis group for the therapy description model
   *
   * @param group
   */
  selectDiagnosisGroup(group: DiagnosisGroup){
    this.diagnosisGroup.set(group);
    if(this.model)
      this.model.diagnosis_group = group.abbreviation;
  }

}
