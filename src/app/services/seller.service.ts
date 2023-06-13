import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn=new BehaviorSubject<boolean>(false)
  isLoginerror= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }

  sellerSignup(data:any){
    // console.log("ACCEPTED DATA");

    this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
      this.isSellerLoggedIn.next(true)
      // localStorage.setItem('seller',JSON.stringify(result.body))
      // this.router.navigate(['seller-home'])
    // console.log("result"+result);
      
    });
}

  reloadSeller(){
      if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['seller-home'])
      }
  }

  sellerLogin(data:any){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
          if(result && result.body && result.body.length){
            // console.log("UserLoggedIn");
            localStorage.setItem('seller',JSON.stringify(result.body))
            this.router.navigate(['seller-home'])

            }
            else{
            // console.log("UserLoginFail");
            this.isLoginerror.emit(true)
            }
          
    })
    
    
  }
}
