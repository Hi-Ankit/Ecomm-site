import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  popularProducts:undefined | product[];
  popularProductsBuy:undefined | product[];
 constructor(private product:ProductService){};
 ngOnInit():void{
  this.product.popularProducts().subscribe((data)=>{
    this.popularProducts=data;
  })
  this.product.popularProductsBuy().subscribe((data)=>{
    this.popularProductsBuy=data;
  })
 };
}
