import { TestBed } from '@angular/core/testing';

import { JudgingMessageService } from './judging-message.service';

describe('JudgingMessageService', () => {
  let service: JudgingMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudgingMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
