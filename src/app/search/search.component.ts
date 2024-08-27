import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
constructor(private activeroute:ActivatedRoute,private product:ProductService){};
serachResult:undefined|product[];
ngOnInit():void{
  let query=this.activeroute.snapshot.paramMap.get('query')
  console.log(query);
  query && this.product.searchProducts(query).subscribe((result)=>{
    this.serachResult=result;
  })
};
}
