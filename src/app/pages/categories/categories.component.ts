import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';

import { RouterLink, ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../core/services/error/error.service';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService=inject(CategoriesService)

  myCategories:string[]=[]
   errorService = inject(ErrorService); 
  error = this.errorService.error;



  ngOnInit(): void {
   this.categoriesService.getCategories().subscribe({
    next:(res)=>{
      // console.log(res);
      
      this.myCategories=res
      
    }
   })
 }
  reloadPage() {
  window.location.reload();
}

}
