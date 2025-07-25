import { TestBed } from '@angular/core/testing';

import { Dataservices } from './dataservices';

describe('Dataservices', () => {
  let service: Dataservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dataservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
