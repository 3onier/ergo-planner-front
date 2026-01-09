import { Injectable } from '@angular/core';
import {DIAGNOSIS_GROUPS} from '../data/diagnosis-groups';
import {Observable, of, throwError} from 'rxjs';
import {DiagnosisGroup} from '../models/diagnosis-group';
import {NotFoundException} from '../common/exceptions/NotFoundException';

@Injectable({
  providedIn: 'root',
})
export class DiagnosisGroupService {
  private GROUPS = DIAGNOSIS_GROUPS;

  public getDiagnosisGroups(): Observable<DiagnosisGroup[]>{
    return of(this.GROUPS);
  }

  public getDiagnosisGroupByAbbreviation(abbreviation: string): Observable<DiagnosisGroup>{
    let out = this.GROUPS.find( (e) => e.abbreviation == abbreviation );
    if(out === undefined){
      return throwError( () => new NotFoundException() );
    }
    return of(out);
  }

}
