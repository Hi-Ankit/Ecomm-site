import { product } from './../data-type';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private route: Router, private Product: ProductService, private user:UserService) {}
  showSearchResult = false;
  searchResult: undefined | product[];
  sellerName: string = '';
  userName: string = '';
  menuType: string = '';
  cartItems=0;
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          let sellerName = sellerData.uname
          if(sellerName===undefined){
            sellerData= sellerStore && JSON.parse(sellerStore)[0]
          }
          this.sellerName = sellerData.uname;
          this.menuType = 'seller';
        }
      else if(localStorage.getItem('user')){
        let userStore = localStorage.getItem('user')
        let userData = userStore && JSON.parse(userStore);
        let userName = userData.uname
        if(userName===undefined){
          userData = userStore && JSON.parse(userStore)[0]
        }
        this.userName = userData.uname;
        this.menuType='user';
        this.Product.getCartList(userData.id)
      }
         else {
          this.menuType = 'default';
        }
      }
    });
    let cartData =localStorage.getItem('localCart')
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.Product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
  sellerLogout() {
    const confirmed = window.confirm('Sure? want to logout?');
    if (confirmed) {
      this.Product.sellerLogout();
    }
  }
  userlogout() {
    const confirmed = window.confirm('Sure? want to logout?');
    if (confirmed) {
      this.user.userLogout();
    }
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLTextAreaElement;
      this.Product.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        result.length = 5;
        this.searchResult = result;
        this.showSearchResult = true;
      });
    }
  }
  hideResult() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`]);
  }
}
