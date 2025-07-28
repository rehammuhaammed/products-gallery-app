import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private readonly httpClient:HttpClient) { }
  id=inject(PLATFORM_ID)
  totalPrice:Signal<number> = computed(() => {
  return this.CartItems().reduce((acc, item) => {
    const quantity = item.quantity;
    return acc + (item.price * quantity); 
  }, 0); 
});
  CartItems: WritableSignal<Iproducts[]> = signal(this.loadCartFromStorage());


   AddToCart(product:Iproducts) {
      const currentCart = this.CartItems();
      const updatedCart = [...currentCart]; 

      const index = updatedCart.findIndex(item => item.id === product.id);

      if (index > -1) {
       
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
      } else {

        updatedCart.push({ ...product, quantity: 1 });
      }

      this.CartItems.set(updatedCart);
      this.saveCartToStorage(updatedCart); 
   }
  
   UpdateCount(id: number, q: number) {
      const currentCart = this.CartItems();
      const updatedCart = currentCart.map(item => {
        if (item.id === id) {
          let newQuantity = (item.quantity || 1) + q;

          if (newQuantity < 1) {
            newQuantity = 1; 
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      this.CartItems.set(updatedCart);
      this.saveCartToStorage(updatedCart); 
  
}
   removeProduct(id: number) {
      const currentCart = this.CartItems();
      const updatedCart = currentCart.filter(item => item.id !== id);

      this.CartItems.set(updatedCart);
      this.saveCartToStorage(updatedCart); 
  
}

clear(){
  this.CartItems.set([])
}




private loadCartFromStorage(): Iproducts[] {
if(isPlatformBrowser(this.id)){
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}
return []
}

private saveCartToStorage(cart: Iproducts[]) {
  if(isPlatformBrowser(this.id)){
  localStorage.setItem('cart', JSON.stringify(cart));
  }
}





}
