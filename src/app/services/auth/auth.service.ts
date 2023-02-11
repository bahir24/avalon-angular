import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {UserService} from "../user/user.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "primeng/api";
import {Router} from "@angular/router";
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: Message = {
    severity: 'success',
    summary: 'Регистрация прошла успешно'
  };

  private backend = ConfigService.config.backend;

  constructor(
    private readonly userService: UserService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
  ) {
  }


  checkUser(user: IUser, isAuth = false) {

    this.http.post<IUser>(this.backend + '/users/' + user.login, user)
      .subscribe((data: IUser) => window.localStorage.setItem('user_' + user.login, JSON.stringify(user)),
        (msg: HttpErrorResponse) => this.message = {severity: 'warn', summary: msg.statusText, detail: 'msg.status'});
    this.userService.setUser(user);
    const token: string = 'user-private-token' + user.id;
    this.userService.setToken(token);

    this.router.navigate(['tickets/tickets-list']);
  }

  changePassword(newPassword: string) {

    if (this.userService.isAuth && this.userService.user) {

      // this.userStorage.find((user) => user.password = newPassword);
      // this.userService.changePassword(newPassword);
      // const userJson: string = JSON.stringify(this.userService.user);
      // this.localStorageService.setLocalStorage(`user_${this.userService.user.login}`, userJson);
    }
  }
}


// , ()=> {

// });
// this.http.post<{ access_token: string, id: string }>(`http://localhost:4200/auth/${isAuth ? user.login : ''}`, user);


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

// getUser()
// :
// IUser
// {
//   return {
//     id: 'user',
//     login: 'name',
//     email: 'test@mail.com',
//     password: '123456',
//     cardNumber: 1234456789123456
//   }
// }
// ;
//
// setUser(user
// :
// IUser
// ):
// void {
//   console.log(this.userStorage);
//   const isUserExist = this.userStorage.find((storageUser: IUser) => storageUser.login === user.login);
//   if(!
// isUserExist
// )
// {
//   this.userStorage.push(user);
// }
// }
//
//
// changePassword(newPassword
// :
// string
// )
// {
//
//   if (this.userService.isAuth && this.userService.user) {
//     this.userStorage.find((user) => user.password = newPassword);
//     this.userService.changePassword(newPassword);
//     const userJson: string = JSON.stringify(this.userService.user);
//     this.localStorageService.setLocalStorage(`user_${this.userService.user.login}`, userJson);
//   }
// }
// }
