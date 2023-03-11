import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAdminChangeModal: boolean = false;
  changePasswordForm!: any;
  labelWidth = 8;
  controlWidth = 10;
  isCollapsed: boolean = false;
  adminName: any;

  updateAdminForm!: FormGroup;
  isAdminVisible: boolean = false;

  AdminInfo: any = {};

  errorTip: any;
  passwordValidation!: string;

  validateStatusConfirmPass!: string;
  errortipValidate: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this.getAdminInfo();
    this.changePasswordForm = this.fb.group({
      Old_Password: [null, [Validators.required]],
      New_Password: [null, [Validators.required]],
      Confirm_Password: [null, [Validators.required]],
    });

    this.updateAdminForm = this.fb.group({
      Name: [null, [Validators.required]],
      PhoneNumber: [null, [Validators.required]],
      Designation: [null, [Validators.required]],
      EmailID: [null, [Validators.required]],
    });
    this.changePasswordForm
      .get('New_Password')
      .valueChanges.subscribe((data: any) => {
        if (this.passwordValidation != 'error') {
          if (this.changePasswordForm.get('Confirm_Password').valid) {
            if (
              this.changePasswordForm.get('New_Password').value ===
              this.changePasswordForm.get('Confirm_Password').value
            ) {
              this.validateStatusConfirmPass = 'success';
            } else {
              this.validateStatusConfirmPass = 'error';
              this.errortipValidate = "Password Doesn't Match";
            }
          } else {
            this.validateStatusConfirmPass = '';
          }
        } else {
          this.validateStatusConfirmPass = '';
          // this.passwordValidation = ''
        }
      });

    this.changePasswordForm
      .get('Confirm_Password')
      .valueChanges.subscribe((data: any) => {
        if (this.passwordValidation != 'error') {
          if (this.changePasswordForm.get('Confirm_Password').valid) {
            if (
              this.changePasswordForm.get('New_Password').value ===
              this.changePasswordForm.get('Confirm_Password').value
            ) {
              this.validateStatusConfirmPass = 'success';
            } else {
              this.validateStatusConfirmPass = 'error';
              this.errortipValidate = "Password Doesn't Match";
            }
          } else {
            this.validateStatusConfirmPass = '';
          }
        } else {
          this.validateStatusConfirmPass = '';
          // this.passwordValidation = ''
        }
      });
  }
  updatePassword() {
    this.isAdminChangeModal = true;
  }
  onCancelAdminPasModal() {
    this.isAdminChangeModal = false;
    this.changePasswordForm.reset();
    this.passwordValidation = '';
    this.validateStatusConfirmPass = '';
  }
  onUpdateAdminPasDetails() {
    if (
      this.passwordValidation == 'error' ||
      this.validateStatusConfirmPass == 'error'
    ) {
    } else {
      const body = {
        Old_Password: this.changePasswordForm.value.Old_Password,
        New_Password: this.changePasswordForm.value.New_Password,
      };
      try {
        this._appService.postMethod_admin('Update_Password', body).subscribe(
          (resp) => {
            if (resp.success) {
              this.nzMessageService.create('success', resp.extras.Status);
              this.isAdminChangeModal = false;
              this.changePasswordForm.reset();
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
  // logout() {
  //   this.router.navigateByUrl('/login')
  //   sessionStorage.clear()
  // }
  logout() {
    const body = {};
    try {
      this._appService.postMethod_admin('Logout', body).subscribe(
        (resp) => {
          if (resp.success) {
            // this.nzMessageService.create('success', resp.extras.Status);
            sessionStorage.clear();
            this.router.navigateByUrl('/');
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
  onUpdateInfo() {
    this.isAdminVisible = true;
    this.updateAdminForm.patchValue({
      Name: this.AdminInfo.Name,
      PhoneNumber: this.AdminInfo.PhoneNumber,
      Designation: this.AdminInfo.Designation,
      EmailID: this.AdminInfo.EmailID,
    });
  }
  onCancelAdminInfo() {
    this.isAdminVisible = false;
    this.updateAdminForm.reset();
  }
  onUpdateAdminInfo() {
    const body = {
      Name: this.updateAdminForm.value.Name,
      PhoneNumber: this.updateAdminForm.value.PhoneNumber,
      Designation: this.updateAdminForm.value.Designation,
      EmailID: this.updateAdminForm.value.EmailID,
    };
    try {
      this._appService.postMethod_admin('Update_Information', body).subscribe(
        (resp) => {
          if (resp.success) {
            this.nzMessageService.create('success', resp.extras.Status);
            this.onCancelAdminInfo();
            this.getAdminInfo();
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
  getAdminInfo() {
    const body = {};
    try {
      this._appService
        .postMethod_admin('Fetch_Admin_Complete_Information', body)
        .subscribe(
          (resp) => {
            if (resp.success) {
              this.AdminInfo = resp.extras.Data;

              this.adminName = this.AdminInfo.Name;
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
  checkPassword() {
    if (this.changePasswordForm.value.New_Password.length > 0) {
      this.passwordValidation = 'validating';
      let body = {
        Password: this.changePasswordForm.value.New_Password,
      };
      try {
        this._appService
          .postMethod_admin('Common_Password_Validation', body)

          .subscribe(
            (resp) => {
              if (resp.success) {
                this.changePasswordForm.get('New_Password').setErrors(null);
                this.passwordValidation = 'success';
              } else {
              }
            },
            (resp) => {
              this.changePasswordForm
                .get('New_Password')
                .setErrors({ pattern: true });
              this.passwordValidation = 'error';
              this.errorTip = resp.error.extras.msg;
            }
          );
      } catch (e) {}
    } else {
      this.passwordValidation = 'null';
    }
  }
  onClick() {
    window.scroll(0, 0);
  }
}
