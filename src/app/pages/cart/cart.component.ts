import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { IcartProduct } from '../../shared/interfaces/icart-product';
import { RouterLink } from '@angular/router';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { ErrorService } from '../../core/services/error/error.service';


@Component({
  selector: 'app-cart',
  imports: [FormsModule,RouterLink,TranslatePipe,DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{
private readonly cartService=inject(CartService)
private readonly sweetalertService=inject(SweetalertService)
errorService = inject(ErrorService); 
error = this.errorService.error;
products:Signal<Iproducts[]> = computed(() => this.cartService.CartItems())
total:Signal<number> = computed(() => this.cartService.totalPrice());




reloadPage() {
  window.location.reload();
}


removeItem(id:number){
 this.cartService.removeProduct(id)
}

UpdateCount(id:number,q:number){
  this.cartService.UpdateCount(id,q)
}

clear(){
  this.cartService.clear()
 
}


}
