import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/errors";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public minLength = 6;
  public registrationForm: FormGroup;
  public isVariousPasswords = false;
  public isLocalStorage = true;
  public useUserCard = false;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private localStorageService: LocalStorageService,
              private http: HttpClient) {
    this.registrationForm = new FormGroup({
      "login": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(this.minLength)]),
      "confirmPassword": new FormControl('', [Validators.required, Validators.minLength(this.minLength)]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "isLocalStorage": new FormControl<boolean>(this.isLocalStorage),
      "cardNumber": new FormControl('',),
    });
  }

  ngOnInit() {
    this.useUserCard = ConfigService.config.useUserCard;
  }

  registrationSubmit(user: IUser) {
    if (this.registrationForm.controls['password'].value !== this.registrationForm.controls['confirmPassword'].value) {
      this.isVariousPasswords = true;
      return;
    }
    const userObj: IUser = {
      login: this.registrationForm.controls['login'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
      cardNumber: this.registrationForm.controls['cardNumber'].value,
    }


    this.http.post<IUser>('http://localhost:4200/auth/users', userObj)
      .subscribe((user: IUser) => {
          this.isVariousPasswords = false;
          this.authService.setUser(user);
          if (this.isLocalStorage) {
            this.setLocalStorage(user);
          }
          this.messageService.add({
            severity: 'success',
            summary: `${user.login} Регистрация ${!!this.registrationForm.controls['isLocalStorage'].value ? 'с сохранением в localStorage ' : ' '}прошла успешно.`,
            life: 1500
          });
          this.registrationForm.reset();
        },
        (err: HttpErrorResponse) => {
          const serverError: ServerError = err.error;
          this.messageService.add({
            severity: 'error',
            summary: serverError.errorText,
            life: 1500
          });
        })
  }

  setLocalStorage(user: IUser) {
    const userJson: string = JSON.stringify(user);
    this.localStorageService.setLocalStorage(`user_${user.login}`, userJson);
  }

}
