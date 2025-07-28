import { Component, computed, inject, input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
constructor(private flowbiteService: FlowbiteService) {}

 private readonly router=inject(Router)
 private readonly mytranslateService=inject(MytranslateService)
 private readonly translateService=inject(TranslateService)
 private readonly cartService=inject(CartService)
 private readonly id=inject(PLATFORM_ID)
 cartItemsNumber:Signal<number> =computed(()=>this.cartService.CartItems().length)
 isDarkMode = false;


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

     if (isPlatformBrowser(this.id)) {
      const savedMode = localStorage.getItem('theme');
      if (savedMode === 'dark') {
        this.isDarkMode = true;
        this.enableDarkMode();
      }
    }

 

  }

  

  
 toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  changelang(lang:string){
    this.mytranslateService.changeLang(lang)
  }

  tranlation(l:string):boolean{
   return this.translateService.currentLang == l
  }
}
