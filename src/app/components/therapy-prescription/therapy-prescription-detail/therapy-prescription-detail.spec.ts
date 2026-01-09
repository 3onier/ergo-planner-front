import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyPrescriptionDetail } from './therapy-prescription-detail';

describe('TherapyPrescriptionDetail', () => {
  let component: TherapyPrescriptionDetail;
  let fixture: ComponentFixture<TherapyPrescriptionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyPrescriptionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapyPrescriptionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
