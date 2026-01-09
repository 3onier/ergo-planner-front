import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeDropdown } from './page-size-dropdown';

describe('PageSizeDropdown', () => {
  let component: PageSizeDropdown;
  let fixture: ComponentFixture<PageSizeDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSizeDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
