import { TestBed } from '@angular/core/testing';

import { TMovimientoService } from './tmovimiento.service';

describe('TMovimientoService', () => {
  let service: TMovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TMovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
