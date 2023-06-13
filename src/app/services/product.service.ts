import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addproduct(data:any){
    console.log("add product serve");
    return this.http.post("http://localhost:3000/products",data);
    }

    productList(){
      return this.http.get("http://localhost:3000/products");
       
    }
    deleteProduct(id:number){
      return this.http.delete(`http://localhost:3000/products/${id}`);
    }
    updateProduct(id:string){
     return this.http.get(`http://localhost:3000/products/${id}`);
     }
     getProduct(id:string){
      return this.http.get(`http://localhost:3000/products/${id}`);
      }

     updatedataofproduct(productData:any){
      return this.http.put(`http://localhost:3000/products/${productData.id}`,productData)
     }
     popularproducts(){
      return this.http.get("http://localhost:3000/products?_limit=4");
     }
     trendyProducts() {
      return this.http.get('http://localhost:3000/products?_limit=8');
    }

    searchProduct(query: string) {
      return this.http.get(`http://localhost:3000/products?q=${query}`);
    }
    cartData:any
    getCartList(userId: number) {
      return this.http.get('http://localhost:3000/cart?userId=' + userId, {
          observe: 'response',
        })
        .subscribe((result) => {
          if (result && result.body) {
            this.cartData.emit(result.body);
          }
        });
    }

    localAddToCart(data:any) {
      let cartData = [];
      let localCart = localStorage.getItem('localCart');
      if (!localCart) {
        localStorage.setItem('localCart', JSON.stringify([data]));
        this.cartData.emit([data]);
      } else {
        cartData = JSON.parse(localCart);
        cartData.push(data);
        localStorage.setItem('localCart', JSON.stringify(cartData));
        this.cartData.emit(cartData);
      }
    }



    
  addToCart(cartData: any) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }



  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any = JSON.parse(cartData);
      items = items.filter((item: any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }


  removeToCart(cartId:any) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

}
