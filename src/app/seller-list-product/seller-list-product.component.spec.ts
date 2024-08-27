import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerListProductComponent } from './seller-list-product.component';

describe('SellerListProductComponent', () => {
  let component: SellerListProductComponent;
  let fixture: ComponentFixture<SellerListProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerListProductComponent]
    });
    fixture = TestBed.createComponent(SellerListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
