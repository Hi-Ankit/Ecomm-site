import { EventEmitter, Injectable } from '@angular/core';
import { login, loginData, submitData } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/user';
  userLoggedIn = new EventEmitter<boolean>(false);
  constructor(
    private http: HttpClient,
    private route: Router,
    private product: ProductService
  ) {}
  userSignUp(user: submitData) {
    this.http
      .post(this.baseUrl, user, { observe: 'response' })
      .subscribe((result: any) => {
        console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['/']);
        }
      });
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/seller-auth']);
    this.product.cartData.emit([]);
  }
  userLogin(data: login) {
    this.http
      .get(`${this.baseUrl}?email=${data.email}&password=${data.password}`, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          console.log('User logged in');
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['home']);
        } else {
          console.log('login failed');
          return this.userLoggedIn.next(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['home']);
    }
  }
}
