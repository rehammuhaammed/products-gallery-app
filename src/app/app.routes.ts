import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},

    

    

    {path:'',component: BlankComponent,title:'blank',children:[
        {path:'home',loadComponent:()=> import ('./pages/home/home.component').then( (c)=>c.HomeComponent ),title:'home'},
        {path:'cart',loadComponent:()=> import ('./pages/cart/cart.component').then( (c)=>c.CartComponent ) ,title:'cart'},
        {path:'categories',loadComponent:()=> import ('./pages/categories/categories.component').then( (c)=>c.CategoriesComponent ) ,title:'categories'},
        {path:'details/:id',loadComponent:()=> import ('./pages/details/details.component').then( (c)=>c.DetailsComponent ) ,title:'details'},
        {path:'catergory-details/:name',loadComponent:()=> import ('./pages/specific-catergory/specific-catergory.component').then( (c)=>c.SpecificCatergoryComponent ) },
        {path:'**', component:NotFoundComponent,title:'Error404!'}
    ]},


    

];
