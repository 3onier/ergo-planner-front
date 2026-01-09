import {inject, Injectable} from '@angular/core';
import {IPatientRepository} from '../repositories/interfaces/ipatient-repository';
import {map, Observable} from 'rxjs';
import {Patient, Patients} from '../models/patient';
import {SearchResult, SearchResults} from '../common/interfaces/search-result';
import {DateFormattingPipe} from '../common/pipes/date-formatting-pipe';
import {ISearchService} from './interfaces/isearch-service';
import {HttpPatientRepository} from '../repositories/http/http-patient-repository';
import {RepositoryParams} from '../common/interfaces/repository-params';
import {PaginatedResult} from '../common/classes/paginated-result';

@Injectable({
  providedIn: 'root',
})
export class PatientService implements ISearchService<Patient>{
  private patientRepo: IPatientRepository = inject(HttpPatientRepository);

  getAllPatients(options?: RepositoryParams): Observable<PaginatedResult<Patient>>{
    return this.patientRepo.getAllPatients(options);
  }

  getPatientById(id: number): Observable<Patient>{
    return this.patientRepo.getPatientById(id);
  }

  savePatient(p: Patient): Observable<Patient>{
    return this.patientRepo.savePatient(p);
  }

  searchFullText(txt: string, options?: RepositoryParams): Observable<PaginatedResult<SearchResult<Patient>>> {
    let dateFormatPipe = new DateFormattingPipe();
    return this.patientRepo.searchFullText(txt, options).pipe(
      map(
        (page) => {
          let result = page.results?.map(
            (p) => {
              return {
                title: p.getListName(),
                data: p,
                details: p.date_birth?.toLocaleDateString()
              } as SearchResult<Patient>
            }
          )
          page.results = [];
          let newPage = page as PaginatedResult<SearchResult<Patient>>;
          newPage.results = result;
          return newPage;
        }
      )
    );
  }

}
