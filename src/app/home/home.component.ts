import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProduct:any
  trendyProduct:any
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.product.popularproducts().subscribe((data)=>{
      console.log(data);
      this.popularProduct=data;
    });

    this.product.trendyProducts().subscribe((result)=>{
      this.trendyProduct=result;
    })
  }
}
