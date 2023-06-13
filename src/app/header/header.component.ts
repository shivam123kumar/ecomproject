import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sellername:string=''
  constructor(private route:Router,private product:ProductService){}
  menuType:string="default"
  userName:string=""
  cartItem=0;

  ngOnInit():void{
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        // console.log(value.url);
        
      if(localStorage.getItem('seller') && value.url.includes('seller')){
        // console.log("in seller Area");
        this.menuType="seller"
        if(localStorage.getItem('seller')){
          let sellerStrorage=localStorage.getItem('seller')
          let sellerdata=sellerStrorage && JSON.parse(sellerStrorage)[0]
          this.sellername=sellerdata.name
        }
        
        
      }
      else if(localStorage.getItem('user')){
        let userStore=localStorage.getItem('user')
        let userData=userStore && JSON.parse(userStore);
        this.userName=userData.name
        this.menuType="user"
      }
      else{
        // console.log("outsite seller Area");
        this.menuType="default"


      }
      }
      // console.log(value.url);
      
    })

    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length
    }
  }

  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }

  // product:any;
  searchResult:any;
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
        this.searchResult=result;
      })
    } }
    hideSearch(){
      this.searchResult=""
    }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]);
  }
}


