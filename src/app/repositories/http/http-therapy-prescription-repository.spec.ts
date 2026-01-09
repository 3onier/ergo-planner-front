import { TestBed } from '@angular/core/testing';

import { HttpTherapyPrescriptionRepository } from './http-therapy-prescription-repository';

describe('HttpTherapyPrescriptionRepository', () => {
  let service: HttpTherapyPrescriptionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTherapyPrescriptionRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
