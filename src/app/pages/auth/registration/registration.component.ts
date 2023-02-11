import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Message} from "primeng/api/message";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public minLength = 6;
  public registrationForm: FormGroup;

  public isVariousPasswords = false;
  public useUserCard = false;
  private usersUrl = "http://localhost:3000/users";

  private message: Message = {
    severity: 'success',
    summary: 'Регистрация прошла успешно'
  };

  public validation = {
    login:true,
    password:true,
    email: {},
    cardNumber:true,
  };



  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,

    private http: HttpClient
  ) {
    this.registrationForm = new FormGroup({
      "login": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(this.minLength)]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "cardNumber": new FormControl('',),
    });

    // Object.keys(this.registrationForm.controls).forEach((key: string)  =>
      // this.registrationForm.get(key)?.statusChanges.forEach(item => this.validation.key = item === 'VALID' ?  true : false));

    // Array.from(this.registrationForm.controls).forEach()

    // for (let i=1;i<)

    // console.log(this.registrationForm.controls);

    this.registrationForm.get('login')?.statusChanges.forEach(item => this.validation.login = item === 'VALID' ?  true : false);
    this.registrationForm.get('password')?.statusChanges.forEach(item => this.validation.password = item === 'VALID' ?  true : false);
    this.registrationForm.get('email')?.statusChanges.forEach(item => this.validation.email = item === 'VALID' ?  true : false);
    this.registrationForm.get('cardNumber')?.statusChanges.forEach(item => this.validation.cardNumber = item === 'VALID' ?  true : false);
  }
  ngOnInit() {
    this.useUserCard = ConfigService.config.useUserCard;
  }
  ngOnChanges(changes: SimpleChanges) {

    console.log(changes)
    // for (const propName in changes) {

      // const chng = changes[propName];
      // const cur  = JSON.stringify(chng.currentValue);
      // const prev = JSON.stringify(chng.previousValue);
      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
  }

  // ngAfterViewInit(): void{
  //   this.registrationForm.controls['cardNumber'].setValue(this.makeUser()?.cardNumber);
  // }

  // checkValidation(){
  //   if(this.registrationForm.invalid){
  //     // let form = this.registrationForm;
  //     // console.log(form.);
  //     // console.log()
  //   }
  // }

  // inputCheckValidation(){
  //   // if(this.){
  //     // let form = this.registrationForm;
  //     // console.log(form.);
  //     // console.log()
  //   // }
  // }

  checkfunc(item: string) {
    console.log(item);
    return 'class';
  }

  registrationSubmit() {
    const user = this.makeUser();

    this.http.post<IUser>(this.usersUrl, user, {headers: new HttpHeaders('Accept: application/json')})
      .subscribe((data: IUser) => window.localStorage.setItem('user_' + user.login, JSON.stringify(user)),
        (msg: HttpErrorResponse) => this.message = {severity: 'warn', summary: msg.statusText, detail: 'msg.status'});

    this.messageService.add(this.message);
  }

  makeUser(): IUser {
    return {
      login: this.registrationForm.controls['login'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
      cardNumber: this.registrationForm.controls['cardNumber'].value,
    }
  }
}


// const objUserJsonStr = JSON.stringify(userObj);
// window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);


// this.http.post(usersUrl, userObj, {}).subscribe(
//   article => {
//     console.log(article);
//   }
// );

// const userObj: IUser = {
//   login: this.registrationForm.controls['login'].value,
//   email: this.registrationForm.controls['email'].value,
//   password: this.registrationForm.controls['password'].value,
//   cardNumber: this.registrationForm.controls['cardNumber'].value,
// }
// console.log('here');
// if (this.registrationForm.controls['password'].value !== this.registrationForm.controls['confirmPassword'].value) {
//   this.isVariousPasswords = true;
//   return;
// }

//   reportProgress?: boolean;
//   responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
//   withCredentials?: boolean;
// } = {}): Observable<any>

// this.http.post(usersUrl, userObj, {'responseType': 'text'}).pipe(123)
// .pipe((response: OperatorFunction<string, unknown>) => return true; );
// tap( // Log the result or error
//   {
//     next: (data) => console.log(data),
//     error: (error) => console.log(error)
//   }
// ):

// this.http.post("http://localhost:3000/users", userObj).pipe(
//
// )

// {};
// reportProgress?: boolean; 'responseType'?: "json"; 'withCredentials'?: boolean; }): Observable<HttpResponse<Object>>


// this.http.post<IUser>('http://localhost:3000/users', userObj)
//   .subscribe({
//     next: () => fail('should have failed with the 404 error'),
//     error: (error: HttpErrorResponse) => {
//       expect(error.status).withContext('status').toEqual(404);
//       expect(error.error).withContext('message').toEqual('asdads');
//     },
//   })


// this.isVariousPasswords = false;
// this.authService.setUser(user);
// if (this.isLocalStorage) {
//   this.setLocalStorage(user);
// }
// this.messageService.add({
//   severity: 'success',
//   summary: `${user.login} Регистрация ${!!this.registrationForm.controls['isLocalStorage'].value ? 'с сохранением в localStorage ' : ' '}прошла успешно.`,
//   life: 1500
// });
// this.registrationForm.reset();
// },
// (err: HttpErrorResponse) => {
//   const serverError: ServerError = err.error;
//   this.messageService.add({
//     severity: 'error',
//     summary: serverError.errorText,
//     life: 1500
//   });
// })
