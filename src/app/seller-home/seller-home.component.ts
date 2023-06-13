import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  constructor(private product:ProductService){}
  icon=faTrash
  editicon=faEdit
  productList:any=[]
  ngOnInit():void{
    
    this.productupdate();
  }


  productmessege=""
  deleteProduct(id:number){
    // console.log("test id ",id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productmessege="product successfully deleted"
        this.productupdate();
      }
    })
    setTimeout(()=>{
      this.productmessege=""
    },4000)
    }
    productupdate(){
       this.product.productList().subscribe((result)=>{
      this.productList=result;
    })
    }
}
