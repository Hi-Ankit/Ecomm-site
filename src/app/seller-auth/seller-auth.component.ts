import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent {
  constructor(private fb: FormBuilder, private seller: SellerService) {}
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  showLogin = false;
  showMsg = false;

  // this is all about register form
  mynewform = this.myform();

  submitData(data: any) {
    console.log(data);
    this.seller.sellerSignUp(data);
  }

  // this is all about login form
  myloginform = this.loginform();
  f(name: string) {
    return this.myloginform.get(name)
  };
  loginform() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  r(anything:string){
    return this.mynewform.get(anything)
  };
  myform() {
    return this.fb.group({
      uname: ['', [Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  showlogin() {
    return (this.showLogin = true);
  }
  Login(data: any) {
    this.seller.sellerLoggedIn.subscribe((IsError) => {
      if (IsError) {
        this.showMsg = true;
      } else {
        this.showMsg = false;
      }
    });
    this.seller.sellerLogin(data);
    console.log(data);
  }
  showregister() {
    return (this.showLogin = false);
  }
}
