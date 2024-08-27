import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productData: undefined | product;
  prdocutQuantity: number = 1;
  cartData: product | undefined;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let producId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(producId);
    producId &&
      this.product.updateList(producId).subscribe((result) => {
        console.log(result);
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (cartData && producId) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => producId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          if (userId === undefined) {
            userId = user && JSON.parse(user)[0].id;
            console.log('UserID', userId);
          }
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                producId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }
  handleQuantity(val: string) {
    if (this.prdocutQuantity < 20 && val === 'plus') {
      this.prdocutQuantity += 1;
    } else if (this.prdocutQuantity > 1 && val === 'min')
      this.prdocutQuantity -= 1;
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.prdocutQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        if (userId === undefined) {
          userId = user && JSON.parse(user)[0].id;
        }
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.log("CartData:",cartData);
        this.product.addTocart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  RemoveToCart(productId: any) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {

      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        if(result){
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          if (userId === undefined) {
            userId = user && JSON.parse(user)[0].id;
            console.log('UserID', userId);
          }
          this.product.getCartList(userId)
        }
      })
    }
    this.removeCart = false;
  }
}
