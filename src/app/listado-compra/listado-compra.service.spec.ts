import { TestBed } from '@angular/core/testing';

import { ListadoCompraService } from './listado-compra.service';

describe('ListadoCompraService', () => {
  let service: ListadoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
