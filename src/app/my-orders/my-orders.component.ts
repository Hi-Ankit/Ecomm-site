import { grandtotal } from './../data-type';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orderData:grandtotal[]|undefined;
  constructor(private product:ProductService){};
  ngOnInit(){
    this.getOrderList();
  };
  cancelOrder(orderId:any|undefined){
    const confirmed=window.confirm("Sure want to cancel order?")
    if(confirmed){
      orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
        this.getOrderList();
        })
    }
  };
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result;
    })
  };
}
