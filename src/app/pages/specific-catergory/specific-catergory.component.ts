import { Iproducts } from './../../shared/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/category/categories.service';
import { ProductsService } from '../../core/services/product/products.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ErrorService } from '../../core/services/error/error.service';

@Component({
  selector: 'app-specific-catergory',
  imports: [TranslatePipe,RouterLink],
  templateUrl: './specific-catergory.component.html',
  styleUrl: './specific-catergory.component.css'
})
export class SpecificCatergoryComponent implements OnInit{
   constructor(private flowbiteService: FlowbiteService) {}


  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly titleService = inject(Title);
  
  private readonly cartService = inject(CartService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly sweetalertService = inject(SweetalertService);
   errorService = inject(ErrorService); 
    error = this.errorService.error;

  myProducts:Iproducts[]=[]
  Cname:string=''


  ngOnInit(): void {

    this.myProducts.length=1
    // console.log(this.myProducts.length);
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        
        
        this.Cname=res.get('name')!
        this.titleService.setTitle(this.Cname)
        
        this.categoriesService.getSpecificCategories(this.Cname).subscribe({
          next:(res)=>{
           
            this.myProducts=res
            
          }
        })




        
      }
    })
  }


reloadPage() {
  window.location.reload();
}  

addToCart(prod:Iproducts){
this.cartService.AddToCart(prod)
this.sweetalertService.showSuccess('Added successfully')}
}