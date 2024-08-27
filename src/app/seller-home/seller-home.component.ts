import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent {
  deleteMsg = false;
  productList: undefined | product[];
  constructor(private product: ProductService, private router: Router) {}
  ngOnInit() {
    this.updatedListAfterOpr();
  }
  deleteOpr(id: any) {
    const confirmed = window.confirm('Sure? want to delete this?');
    if (confirmed) {
      console.log('ID:', id);
      this.product.deleteProduct(id).subscribe((result: any) => {
        if (result) {
          this.deleteMsg = true;
          this.updatedListAfterOpr();
          setTimeout(() => {
            this.deleteMsg = true;
          }, 1000);
        }
      });
    }
  }
  updatedListAfterOpr() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
