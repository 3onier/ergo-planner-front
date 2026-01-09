import { TestBed } from '@angular/core/testing';

import { DiagnosisGroupService } from './diagnosis-group-service';

describe('DiagnosisGroupService', () => {
  let service: DiagnosisGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
