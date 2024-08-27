import { ProductService } from '../services/product.service';
import { Component } from '@angular/core';
import { cart, grandtotal } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  totalPrice:number|undefined;
  cartData: cart[] |undefined;
  odrMessage:string|undefined;
  constructor(private product: ProductService, private router:Router) {}
  ngOnInit() {
    this.product.currentCart().subscribe((result: any) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: any) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
        this.totalPrice=price+(price/10)+100-(price/10);
      })
    });
  }
  orderNow(data:grandtotal) {
    let user= localStorage.getItem('user');
    let userId= user&& JSON.parse(user).id
    if(userId===undefined){
      userId= user&& JSON.parse(user)[0].id
    }
    if(this.totalPrice){
      let orderData:grandtotal={
        ...data,
        totalprice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
        item.id && this.product.deleteCartItems(item.id)
        console.log('Id',item.id);
        }, 600);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
         this.odrMessage ="Your order has been placed."
         setTimeout(() => {
          this.router.navigate(['/my-order'])
          this.odrMessage=undefined
         }, 2000);
        }
      })
    }
  }
}
