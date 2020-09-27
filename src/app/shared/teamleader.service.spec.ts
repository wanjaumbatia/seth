import { TestBed } from '@angular/core/testing';

import { TeamleaderService } from './teamleader.service';

describe('TeamleaderService', () => {
  let service: TeamleaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamleaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
