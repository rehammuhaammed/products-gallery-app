import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpClient:HttpClient) { }

   getAllProducts(sort?:string): Observable<any> {
    let params=new HttpParams()
   
    if(sort){
      params=params.set('sort',sort)
    }
    
  return this.httpClient.get(`https://fakestoreapi.com/products`,{params});
}
 



getSpecificProduct(id:string):Observable<any>{
return this.httpClient.get(`https://fakestoreapi.com/products/${id}`)
}


 


}
