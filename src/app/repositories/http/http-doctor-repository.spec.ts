import { TestBed } from '@angular/core/testing';

import { HttpDoctorRepository } from './http-doctor-repository';

describe('HttpDoctorRepository', () => {
  let service: HttpDoctorRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDoctorRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
