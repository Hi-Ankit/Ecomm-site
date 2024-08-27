import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { loginData, submitData } from '../data-type';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedInn = new BehaviorSubject<boolean>(false);
  sellerLoggedIn = new EventEmitter<boolean>(false);
  url = 'http://localhost:3000/seller';
  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUp(data: submitData) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result): void => {
        this.isSellerLoggedInn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  sellerLogin(data: loginData) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          console.log('user logged in');
          this.isSellerLoggedInn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.log('Login failed');
          return this.sellerLoggedIn.next(true);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedInn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
