import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {Message, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/errors";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public login = '';
  public password = '';
  public minLength = 6;
  public authForm: FormGroup;
  public useUserCard = false;
  public backend = ConfigService.config.backend;
  private message: Message = {severity: 'info', summary: '', detail: ''};



  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private http: HttpClient,

  ) {
    this.authForm = new FormGroup({
      "login": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(this.minLength)]),
      "cardNumber": new FormControl(),
    })
  }

  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
  }

  authSubmit(user: IUser) {
    this.http.post<IUser>(this.backend + '/users/'+user.login, user)
      .subscribe((data: IUser) => window.localStorage.setItem('user_' + user.login, JSON.stringify(user)),
        (msg: HttpErrorResponse) => this.message = {severity: 'warn', summary: msg.statusText, detail: 'msg.status'});
    this.authService.checkUser(user, true)
  }

  onAuth(user: IUser){
    this.http.post<IUser>(this.backend + '/users/'+user.login, user)
      .subscribe((data: IUser) => window.localStorage.setItem('user_' + user.login, JSON.stringify(user)),
        (msg: HttpErrorResponse) => this.message = {severity: 'warn', summary: msg.statusText, detail: 'msg.status'});
    this.userService.setUser(user);
    const token: string = btoa('user-private-token:' + user.id);
    this.userService.setToken(token);

    this.router.navigate(['tickets/tickets-list']);

  }

}




// this.authService.checkUser(user, true)
//   .subscribe(({access_token, id}) => {
//       console.warn(access_token)
//       const login = user.login;
//       user.id = id;
//       this.userService.user = user;
//       this.userService.setToken(access_token);
//       this.messageService.add({severity: 'success', summary: 'Добро пожаловать ' + login, life: 1500});
//       this.router.navigate(['/tickets']);
//       this.authForm.reset();
//     },
//     (err: HttpErrorResponse) => {
//       const serverError: ServerError = err.error;
//       this.messageService.add({severity: 'error', summary: serverError.errorText, life: 1500});
//     })
// , ()=> {

// });
// this.http.post<{ access_token: string, id: string }>(`http://localhost:4200/auth/${isAuth ? user.login : ''}`, user);
