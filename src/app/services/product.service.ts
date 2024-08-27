import { product, cart, grandtotal } from './../data-type';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _isTestEnvironment } from '@angular/cdk/platform';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient, private router: Router) {}
  private baseUrl = 'http://localhost:3000/product';
  productData(data: product) {
    this.http
      .post('http://localhost:3000/product', data, { observe: 'response' })
      .subscribe((result): void => {
        console.log(data, result);
      });
  }
  productList() {
    return this.http.get<product[]>(this.baseUrl);
  }
  deleteProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateList(id: any) {
    return this.http.get<product>(`${this.baseUrl}/${id}`);
  }
  updateListData(product: product) {
    return this.http.put<product>(`${this.baseUrl}/${product.id}`, product);
  }
  sellerLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/seller-auth']);
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=4');
  }
  popularProductsBuy() {
    return this.http.get<product[]>(this.baseUrl);
  }
  searchProducts(query: any) {
    return this.http.get<product[]>(`${this.baseUrl}?type=${query}`);
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: any) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addTocart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log('res:', result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).id;
    if (userData === undefined) {
      userData = userStore && JSON.parse(userStore)[0].id;
    }
    return this.http.get<cart>('http://localhost:3000/cart?userId=' + userData);
  }
  orderNow(data: grandtotal) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).id;
    if (userData === undefined) {
      userData = userStore && JSON.parse(userStore)[0];
    }
    return this.http.get<grandtotal[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }
  deleteCartItems(cartId: number) {
    return this.http
      .delete(`${'http://localhost:3000/cart/'}${cartId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }
  cancelOrder(orderId: any) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
