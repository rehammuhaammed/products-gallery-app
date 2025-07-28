import { Component, inject, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ErrorService } from '../../core/services/error/error.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { SortPipe } from '../../shared/pipes/sort.pipe';





@Component({
  selector: 'app-home',
  imports:[CarouselModule,RouterLink,FormsModule,TranslatePipe,SearchPipe,SortPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
  
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService); 
  private readonly cartService = inject(CartService); 
  private readonly sweetalertService=inject(SweetalertService)
    errorService = inject(ErrorService); 
    error = this.errorService.error;
    sortOption:string='Default'
    isOpen:boolean = false;
    result:number=0
    myProducts: Iproducts[] = [];
    currentPage: number = 1;
    searchItem:string=''



  FadeOptions: OwlOptions = {
        loop: true,
        rtl:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        autoplay: true,
        animateIn: 'fadeIn', 
        animateOut: 'fadeOut', 
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        items: 1
      };
  
  ngOnInit(): void {
     this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.myProducts = res;
        this.result=this.myProducts.length
        
        
      },
      
    });
      
  }

  


addToCart(prod:Iproducts){
  this.cartService.AddToCart(prod)
  this.sweetalertService.showSuccess('Added successfully')

  // console.log('addedd');
  // console.log(this.cartService.CartItems());
  
}

reloadPage() {
  window.location.reload();
}

setoption(op:string){
this.sortOption = op;
this.isOpen = false;
}  


}


