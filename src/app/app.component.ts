import { Component } from '@angular/core';
import { SellerService } from './services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecomm-site';
  constructor(private router:Router){};
  ngOnInit(){
    this.router.navigate(["/home"])
  };
}
