import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListCard } from './patient-list-card';

describe('PatientListCard', () => {
  let component: PatientListCard;
  let fixture: ComponentFixture<PatientListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
