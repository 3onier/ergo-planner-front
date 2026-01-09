import { TestBed } from '@angular/core/testing';

import { HttpIcdCodeRepository } from './http-icd-code-repository';

describe('HttpIcdCodeRepository', () => {
  let service: HttpIcdCodeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIcdCodeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
