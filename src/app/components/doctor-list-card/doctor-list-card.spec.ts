import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListCard } from './doctor-list-card';

describe('DoctorListCard', () => {
  let component: DoctorListCard;
  let fixture: ComponentFixture<DoctorListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
