import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyPrescriptionList } from './therapy-prescription-list';

describe('TherapyPrescriptionList', () => {
  let component: TherapyPrescriptionList;
  let fixture: ComponentFixture<TherapyPrescriptionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyPrescriptionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapyPrescriptionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
