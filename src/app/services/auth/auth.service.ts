import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {UserService} from "../user/user.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStorage: IUser[] = [];

  constructor(private readonly userService: UserService, private localStorageService: LocalStorageService, private http: HttpClient) {
  }

  checkUser(user: IUser, isAuth = false): Observable<{ access_token: string, id: string }> {
    return this.http.post<{ access_token: string, id: string }>(`http://localhost:4200/auth/${isAuth ? user.login : ''}`, user);
    // const isUserExist = this.userStorage.find((storageUser: IUser) => storageUser.login === user.login);
    // if (!isUserExist) {
    //   const localStorageUser = this.localStorageService.getLocalStorage(`user_${user.login}`);
    //   if (localStorageUser) {
    //     const userObject: IUser = JSON.parse(localStorageUser);
    //     if (user.password === userObject.password) {
    //       this.userService.user = user;
    //       return true;
    //     }
    //     return false;
    //   }
    // }
    // if (isUserExist) {
    //   if (user.password === isUserExist.password) {
    //     this.userService.user = user;
    //     return true;
    //   }
    //   return false;
    // }
    // return false;
  }

  getUser(): IUser {
    return {
      id: 'user',
      login: 'name',
      email: 'test@mail.com',
      password: '123456',
      cardNumber: 1234456789123456
    }
  };

  setUser(user: IUser): void {
    console.log(this.userStorage);
    const isUserExist = this.userStorage.find((storageUser: IUser) => storageUser.login === user.login);
    if (!isUserExist) {
      this.userStorage.push(user);
    }
  }

  changePassword(newPassword: string) {
    if (this.userService.isAuth && this.userService.user) {
      this.userStorage.find((user) => user.password = newPassword);
      this.userService.changePassword(newPassword);
      const userJson: string = JSON.stringify(this.userService.user);
      this.localStorageService.setLocalStorage(`user_${this.userService.user.login}`, userJson);
    }
  }
}
