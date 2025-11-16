import { TestBed } from '@angular/core/testing';

import { CartCount } from './cart-count';

describe('CartCount', () => {
  let service: CartCount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
