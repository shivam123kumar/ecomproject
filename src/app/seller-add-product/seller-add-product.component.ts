import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  constructor(private product:ProductService){}
  Addproduct=new FormGroup(
    {
      name:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]),
      color:new FormControl(''),
      category:new FormControl(''),
      description:new FormControl(''),
      image:new FormControl(''),
      
  }

  )
  addproductmessege:string|undefined=""
  acceptProduct(){
    this.product.addproduct(this.Addproduct.value).subscribe((result)=>{
      console.log(result);
      if(result){
          this.addproductmessege="Product is Added successfully"
      }
      setTimeout(()=>this.addproductmessege=undefined,3000)
      
    });

    
  }
}
