import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpErrorResponse} from "@angular/common/http";
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
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
    this.authService.checkUser(user, true)
      .subscribe(({access_token, id}) => {
          console.warn(access_token)
          const login = user.login;
          user.id = id;
          this.userService.user = user;
          this.userService.setToken(access_token);
          this.messageService.add({severity: 'success', summary: 'Добро пожаловать ' + login, life: 1500});
          this.router.navigate(['/tickets']);
          this.authForm.reset();
        },
        (err: HttpErrorResponse) => {
          const serverError: ServerError = err.error;
          this.messageService.add({severity: 'error', summary: serverError.errorText, life: 1500});
        })
  }

}
