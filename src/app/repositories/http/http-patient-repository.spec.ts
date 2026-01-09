import { TestBed } from '@angular/core/testing';

import { HttpPatientRepository } from './http-patient-repository';

describe('HttpPatientRepository', () => {
  let service: HttpPatientRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPatientRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
