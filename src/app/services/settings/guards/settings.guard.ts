import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../user/user.service";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate {
  constructor(private userService: UserService, private messageService: MessageService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAuth) {
      this.messageService.add({severity: 'error', summary: 'Вы не авторизованны', life: 1500});
    }
    // some
    //some2
    return this.userService.isAuth;
  }

}
