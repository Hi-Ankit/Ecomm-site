import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent {
  constructor(private fb: FormBuilder, private product: ProductService) {}
  showMsg = false;
  newproducts = this.newAddProduct();
  newAddProduct() {
    return this.fb.group({
      pname: [''],
      type: [''],
      color: [''],
      price: [''],
      description: [''],
      image: [''],
    });
  }
  AddProduct(data: any) {
    this.product.productData(data);
    if (data) {
      this.showMsg = true;
    }
  }
}
