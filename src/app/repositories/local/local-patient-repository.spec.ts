import { TestBed } from '@angular/core/testing';

import { LocalPatientRepository } from './local-patient-repository';

describe('LocalPatientRepository', () => {
  let service: LocalPatientRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPatientRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
