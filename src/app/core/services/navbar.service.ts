import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  hideUserMenu = signal(true);
  toggeleNavbarMenu(){
   this.hideUserMenu.set(!this.hideUserMenu()) 
  }
}
