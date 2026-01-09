import { TestBed } from '@angular/core/testing';

import { TherapyPrescriptionService } from './therapy-prescription-service';

describe('TherapyPrescriptionService', () => {
  let service: TherapyPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapyPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
