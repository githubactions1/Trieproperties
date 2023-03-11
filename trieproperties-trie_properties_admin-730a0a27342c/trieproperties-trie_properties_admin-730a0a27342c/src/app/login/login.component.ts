import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm:any = FormGroup;

  condition: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private appService: AppService,
    private _CookieService: CookieService
  ) {}

  ngOnInit() {
    this.LoginForm = this.fb.group({
      EmailID: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }
  signInButton() {
    this.condition = false;
  }
  signUpButton() {
    this.condition = true;
  }
  submitForm() {
    for (const i in this.LoginForm.controls) {
      this.LoginForm.controls[i].markAsDirty();
      this.LoginForm.controls[i].updateValueAndValidity();
    }
    const body = {
      EmailID: this.LoginForm.value.EmailID,
      Password: this.LoginForm.value.Password,
    };

    try {
      this.appService.postMethod_admin('Login', body).subscribe(
        (resp: any) => {
          if (resp.success) {
            this._CookieService.set(
              'trieadminData',
              JSON.stringify(resp.extras.AdminData)
            );
            this.router.navigateByUrl('/dashboard');
          } else {
            this.nzMessageService.error(resp.extras.msg);
          }
        },
        (resp) => {
          this.nzMessageService.error(resp.error.extras.msg);
        }
      );
    } catch (e) {}
  }
}
