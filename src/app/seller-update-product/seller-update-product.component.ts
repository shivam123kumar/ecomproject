import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Validator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  constructor(private route:ActivatedRoute,private product:ProductService){}
productData:any
 
  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get('id');
    productId && this.product.updateProduct(productId).subscribe((result)=>{
      this.productData=result
         })
  }
  

  updateshowmessege=""
  acceptProduct(productdata:any){
  
    
    if(this.productData){
      productdata.id=this.productData.id;
      
    }
    this.product.updatedataofproduct(productdata).subscribe((result)=>{
      if(result){
        this.updateshowmessege="product details updated"
      }
    })
    setTimeout(() => {
      this.updateshowmessege=""
    }, 10000);
    }
}
