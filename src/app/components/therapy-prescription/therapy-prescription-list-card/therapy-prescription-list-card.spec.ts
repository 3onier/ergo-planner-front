import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyPrescriptionListCard } from './therapy-prescription-list-card';

describe('TherapyPrescriptionListCard', () => {
  let component: TherapyPrescriptionListCard;
  let fixture: ComponentFixture<TherapyPrescriptionListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyPrescriptionListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapyPrescriptionListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
