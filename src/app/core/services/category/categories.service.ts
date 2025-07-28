import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  {

  constructor( private readonly httpClient:HttpClient) { }

getCategories():Observable<any>{
  return this.httpClient.get(`https://fakestoreapi.com/products/categories`)
}
getSpecificCategories(category:string):Observable<any>{
  return this.httpClient.get(`https://fakestoreapi.com/products/category/${category}`)
}


}
