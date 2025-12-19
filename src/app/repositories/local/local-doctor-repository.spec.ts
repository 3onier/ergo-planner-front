import { TestBed } from '@angular/core/testing';

import { LocalDoctorRepository } from './local-doctor-repository';

describe('LocalDoctorRepository', () => {
  let service: LocalDoctorRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDoctorRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
