import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService,private router:Router) {}
  
  ngOnInit():void{
    this.seller.reloadSeller();
  }

  registrationform=new FormGroup({
      name:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]),
      email:new FormControl(''),
      password:new FormControl('')
  })
  LoginForm=new FormGroup({

    email:new FormControl(''),
      password:new FormControl('')
  })


  messege="";
  formSubmit(){
    // console.log("ACCEPTED DATA");
    // console.log(this.registrationform.value);
    this.seller.sellerSignup(this.registrationform.value);
    // console.log("send DATA");
    this.messege="Registered! Sucessfully"

}

loginerror=""
formLogin(){
  this.loginerror=""
    // console.log("ACCEPTED DATA");
    console.log(this.LoginForm.value);
    this.seller.sellerLogin(this.LoginForm.value);
    this.seller.isLoginerror.subscribe((iserror)=>{
      if(iserror){
        this.loginerror="Invalid Username or Password"
      }
    })
}


showlogin=false
openLogin(){
 this.showlogin=true 
}
openSignup(){
 this.showlogin=false
}
}
