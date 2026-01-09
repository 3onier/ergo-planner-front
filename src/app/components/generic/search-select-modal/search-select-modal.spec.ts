import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectModal } from './search-select-modal';

describe('SearchSelectModal', () => {
  let component: SearchSelectModal;
  let fixture: ComponentFixture<SearchSelectModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSelectModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSelectModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
