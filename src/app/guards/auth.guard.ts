import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioService: UsuarioService, 
              private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {  
      return this.usuarioService.validarToken().pipe(
        tap(isAutenticado => {
          if (!isAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
}
