import { product, cart } from './../data-type';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private product: ProductService
  ) {}

  userLogin = this.myUser();
  showLogin = false;
  showMsg = false;
  ngOnInit() {
    this.user.userAuthReload();
  }
  f(anything: string) {
    return this.userLogin.get(anything);
  }
  myUser() {
    return this.fb.group({
      uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  myloginform = this.loginform();
  r(anything: string) {
    return this.myloginform.get(anything);
  }
  loginform() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  showlogin() {
    return (this.showLogin = true);
  }
  Login(data: any) {
    this.user.userLogin(data);
    console.log(data);
    this.localCartToRemoteCart();
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: product, index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addTocart(cartData).subscribe((result) => {
            if (result) {
              console.log('Item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }
  submitData(data: any) {
    this.user.userSignUp(data);
  }
  showregister() {
    return (this.showLogin = false);
  }
}
