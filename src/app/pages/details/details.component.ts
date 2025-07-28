import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { ModalComponent } from "../../shared/components/ui/modal/modal/modal.component";
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { TranslatePipe } from '@ngx-translate/core';
import { log } from 'node:console';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ErrorService } from '../../core/services/error/error.service';

@Component({
  selector: 'app-details',
  imports: [ModalComponent,TranslatePipe,RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute =inject(ActivatedRoute)
private readonly productsService =inject(ProductsService)
private readonly cartService =inject(CartService)
  private readonly sweetalertService=inject(SweetalertService)
  errorService = inject(ErrorService); 
    error = this.errorService.error;

productId:any
currentimg:string=''
productDetails:Iproducts={} as Iproducts

Math =Math; 
quantity:number=0
myProducts: Iproducts[] = [];
relatedProducts:Iproducts[]=[];

constructor(private flowbiteService: FlowbiteService) {}


ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.productId=res.get('id')

      this.productsService.getSpecificProduct(this.productId).subscribe({
        next:(res)=>{
          this.productDetails=res
           this.flowbiteService.loadFlowbite(() => {
              initFlowbite();
            });
            this.productsService.getAllProducts().subscribe({
            next:(res)=>{
              this.myProducts=res             
              this.relatedProducts = this.myProducts.filter(product => product.category === this.productDetails.category);
            //  console.log(this.relatedProducts);
              
            }
          })
          
          
          
          
        }
      })
     
      
    }
  })


}



addToCart(prod:Iproducts){
  this.cartService.AddToCart(prod)
  this.sweetalertService.showSuccess('Added successfully')
}
openModal(img:string){
  this.currentimg=img
  console.log(this.currentimg);
}
reloadPage() {
  window.location.reload();
}

}
