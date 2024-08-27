import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEditProductComponent } from './seller-edit-product.component';

describe('SellerEditProductComponent', () => {
  let component: SellerEditProductComponent;
  let fixture: ComponentFixture<SellerEditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerEditProductComponent]
    });
    fixture = TestBed.createComponent(SellerEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
