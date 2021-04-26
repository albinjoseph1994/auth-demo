import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    let token = localStorage.getItem('devgroceryToken');
    if (!token) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
  
}
