import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  public minLength = 6;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl('', [Validators.minLength(this.minLength), this.checkPassword('confirmOldPassword', true)]),
      'confirmOldPassword': new FormControl('', [Validators.minLength(this.minLength), this.checkPassword('oldPassword')]),
      'newPassword': new FormControl('', [Validators.minLength(this.minLength), Validators.required])
    })
  }

  checkPassword(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value ? null : {matching: true};
    };
  }

  changePassSubmit() {
    if (this.changePasswordForm.controls['oldPassword'].value === this.userService.user?.password) {
      this.authService.changePassword(this.changePasswordForm.controls['newPassword'].value);
      this.changePasswordForm.reset();
      this.messageService.add({severity: 'success', summary: 'Пароль изменен', life: 1500});
    } else if (this.changePasswordForm.controls['oldPassword'].value === this.changePasswordForm.controls['newPassword'].value) {
      this.messageService.add({severity: 'error', summary: 'Новый пароль не должен совпадать со старым', life: 1500});
    } else {
      this.messageService.add({severity: 'error', summary: 'Данные введены неверно', life: 1500});
    }

  }

}
