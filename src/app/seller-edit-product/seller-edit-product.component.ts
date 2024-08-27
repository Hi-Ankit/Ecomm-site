import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.scss']
})
export class SellerEditProductComponent {
  constructor(private fb:FormBuilder,private product:ProductService, private route:ActivatedRoute){};
  productData:undefined| product;
  showMsg=false;
  ngOnInit(){
    let productId=this.route.snapshot.paramMap.get('id')
    console.log("id:",productId);
    productId && this.product.updateList(productId).subscribe((data)=>{
      this.productData=data
    })
  };
  EditedList(data:any){
    console.log("Data:",data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateListData(data).subscribe((result)=>{
     console.log("Result:",result);

    });
    if(data){
      this.showMsg=true;
    }
  }
}
