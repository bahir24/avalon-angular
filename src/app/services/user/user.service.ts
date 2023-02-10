import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {TicketsStorageService} from "../tickets-storage/tickets-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user!: IUser | null;
  public isAuth = false;
  private token!: string | null;
  private tokenName = 'token';

  constructor(
    private localStorageService: LocalStorageService,
    private ticketStorageService: TicketsStorageService
  ) {
  }

  setUser(user: IUser | null) {
    this.user = user;
    this.isAuth = true;
    console.log('set user', this.user);
  }

  getUser(): IUser | null {
    return this.user;
  }

  setToken(token: string): void {
    this.token = token;
    this.localStorageService.setLocalStorage(this.tokenName, this.token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = this.localStorageService.getLocalStorage(this.tokenName);
    }
    return this.token;
  }

  clearUser() {
    this.user = null;
    this.isAuth = false;
    this.token = null;
    this.localStorageService.removeFromLocaleStorage(this.tokenName);
    this.ticketStorageService.setStorage([]);
  }

  changePassword(newPass: string) {
    if (this.user) {
      this.user.password = newPass;
    }
  }
}
