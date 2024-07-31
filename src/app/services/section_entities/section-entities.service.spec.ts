import { TestBed } from '@angular/core/testing';

import { SectionEntitiesService } from './section-entities.service';

describe('SectionEntitiesService', () => {
  let service: SectionEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
