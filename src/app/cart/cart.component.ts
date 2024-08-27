import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { billing, cart, product } from '../data-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  productData: product | undefined;
  cartData: cart[] | undefined;
  popularProductsBuy: undefined | product[];
  cartdata: product | undefined;
  billingData: billing = {
    amount: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0,
  };
  constructor(private product: ProductService) {}
  ngOnInit() {
    this.loadDetails();
  }
  removeCart(productId: any) {
    productId && this.product.removeToCart(productId)
    .subscribe((result) => {
        if (result) {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          if (userId === undefined) {
            userId = user && JSON.parse(user)[0].id;
            console.log('UserID', userId);
          }
          this.product.getCartList(userId);
        }
        this.loadDetails();
      });
  }
  loadDetails() {
    this.product.currentCart().subscribe((result: any) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: any) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.billingData.amount = price;
      this.billingData.discount = price / 15;
      this.billingData.delivery = 100;
      this.billingData.tax = price / 10;
      this.billingData.total = price + price / 10 + 100 - price / 15;
    });
    this.product.popularProducts().subscribe((result) => {
      this.popularProductsBuy = result;
    });
  }
  addtoCart(productId: any): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user);
    if (userId === undefined) {
      userId = user && JSON.parse(user)[0].id;
    }
    if (userId) {
      this.product.addTocart(productId).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId);
          console.log('ProductId:', productId);
          console.log('Result:', result);
        }
      });
    }
  }
}
