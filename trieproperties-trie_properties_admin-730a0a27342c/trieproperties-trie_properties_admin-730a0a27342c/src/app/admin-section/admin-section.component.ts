import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css'],
})
export class AdminSectionComponent implements OnInit {
  skip = 0;
  limit = this.appService.limit;
  currentPage = 0;
  TotalItems: any;
  isTableloading: boolean = false;

  adminList: any = [];

  updatePasswordForm: any;
  isPasswordVisible: boolean = false;
  selectedAdminData: any;
  isEditing: boolean = false;
  isAdding: boolean = false;

  addForm: any = FormGroup;
  selectedData: any;
  isAddBtnLoading: boolean = false;
  errorTip: any;
  passwordValidation!: string;

  validateStatusConfirmPass!: string;
  errortipValidate: any;
  isActiveList = true;
  Search: any = new FormControl('')

  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.Search.valueChanges.subscribe((data: any) => {
      this.skip = 0
      this.getAdminList()
    })
    this.isActiveList = true;
    this.onChangeStatus();
    this.addForm = this.fb.group({
      Name: [null, [Validators.required]],
      PhoneNumber: [null, [Validators.required]],
      Designation: [null, [Validators.required]],
      EmailID: [null, [Validators.required]],
      Password: [null],
    });
    this.updatePasswordForm = this.fb.group({
      Password: [null, [Validators.required]],
      Confirm_Password: [null, [Validators.required]],
    });

    this.updatePasswordForm
      .get('Password')
      .valueChanges.subscribe((data: any) => {
        if (this.passwordValidation != 'error') {
          if (this.updatePasswordForm.get('Confirm_Password').valid) {
            if (
              this.updatePasswordForm.get('Password').value ===
              this.updatePasswordForm.get('Confirm_Password').value
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

    this.updatePasswordForm
      .get('Confirm_Password')
      .valueChanges.subscribe((data: any) => {
        if (this.passwordValidation != 'error') {
          if (this.updatePasswordForm.get('Confirm_Password').valid) {
            if (
              this.updatePasswordForm.get('Password').value ===
              this.updatePasswordForm.get('Confirm_Password').value
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
  onChangeStatus() {
    this.skip = 0;
    this.getAdminList();
  }
  getAdminList() {
    const body = {
      Skip: this.skip,
      Limit: this.limit,
      Whether_Status_Filter: true,
      Status: this.isActiveList,
      Whether_Search_Filter: this.Search.value.length > 0 ? true : false,
      Search_Input: this.Search.value
    };
    try {
      this.isTableloading = true;
      this.appService
        .postMethod_admin('Filter_All_Admin_Users', body)
        .subscribe(
          (resp) => {
            if (resp.success) {
              this.isTableloading = false;
              if (this.skip == 0) {
                this.currentPage = 1;
                this.TotalItems = resp.extras.Count;
              }
              this.TotalItems = resp.extras.Count;
              this.adminList = resp.extras.Data;
            } else {
              this.isTableloading = false;
              this.nzMessageService.error(resp.extras.msg);
            }
          },
          (resp) => {
            this.isTableloading = false;
            this.nzMessageService.error(resp.error.extras.msg);
          }
        );
    } catch (e) { }
  }
  onNextPage(event: number) {
    this.currentPage = event;
    this.skip = (event - 1) * this.limit;
    this.getAdminList();
  }
  onAction(data: any) {
    let url = '';
    if (data.Status) {
      url = 'Inactivate_Admin';
    } else {
      url = 'Activate_Admin';
    }
    let body = {
      Selected_AdminID: data.AdminID,
    };
    try {
      this.appService.postMethod_admin(url, body).subscribe(
        (resp) => {
          if (resp.success) {
            let msg;
            if (data.Status) {
              msg = 'Inactivated Successfully';
            } else {
              msg = 'Activated Successfully';
            }
            this.nzMessageService.success(msg);
            this.getAdminList();
          } else {
            this.nzMessageService.error(resp.extras.msg);
          }
        },
        (resp) => {
          this.nzMessageService.error(resp.error.extras.msg);
        }
      );
    } catch (e) { }
  }
  onUpdatePassword(data: any) {
    this.selectedAdminData = data;
    this.isPasswordVisible = true;
  }
  onCancelModal() {
    this.isPasswordVisible = false;
    this.updatePasswordForm.reset();
    this.passwordValidation = '';
    this.validateStatusConfirmPass = '';
  }
  onUpdatePasswordDetails() {
    if (
      this.passwordValidation == 'error' ||
      this.validateStatusConfirmPass == 'error'
    ) {
    } else {
      const body = {
        Selected_AdminID: this.selectedAdminData.AdminID,
        Password: this.updatePasswordForm.value.Password,
      };
      try {
        this.appService
          .postMethod_admin('Update_Admin_Password', body)
          .subscribe(
            (resp) => {
              if (resp.success) {
                this.nzMessageService.create('success', resp.extras.Status);
                this.onCancelModal();
              } else {
                this.nzMessageService.error(resp.extras.msg);
              }
            },
            (resp) => {
              this.nzMessageService.error(resp.error.extras.msg);
            }
          );
      } catch (e) { }
    }
  }
  onAdd() {
    this.isEditing = false;
    this.isAdding = true;
  }
  onEdit(data: any) {
    this.isEditing = true;
    this.isAdding = true;
    this.selectedData = data;
    this.addForm.patchValue(
      {
        Name: this.selectedData.Name,
        EmailID: this.selectedData.EmailID,
        PhoneNumber: this.selectedData.PhoneNumber,
        Designation: this.selectedData.Designation,
      },
      { emitEvent: false }
    );
  }
  onClose() {
    this.isEditing = false;
    this.isAdding = false;
    this.isAddBtnLoading = false;
    this.addForm.reset();
  }
  onsubmit() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      if (!this.isEditing && this.addForm.get('Password').value == null || this.addForm.get('Password').value == "") {
        this.nzMessageService.warning("Please Enter Password")

      }
      else {


        this.isAddBtnLoading = true;
        let body = {};
        let url = '';
        if (this.isEditing) {
          body = {
            Selected_AdminID: this.selectedData.AdminID,
            Name: this.addForm.value.Name,
            EmailID: this.addForm.value.EmailID,
            PhoneNumber: this.addForm.value.PhoneNumber,
            Designation: this.addForm.value.Designation,
          };
          url = 'Update_Admin_Information';
        } else {
          body = {
            Name: this.addForm.value.Name,
            EmailID: this.addForm.value.EmailID,
            Password: this.addForm.value.Password,
            PhoneNumber: this.addForm.value.PhoneNumber,
            Designation: this.addForm.value.Designation,
          };
          url = 'Create_Admin_User';
        }
        try {
          this.appService.postMethod_admin(url, body).subscribe(
            (resp: any) => {
              if (resp.success) {
                this.onClose();
                this.getAdminList();
                this.nzMessageService.success(resp.extras.Status);
              } else {
                this.isAddBtnLoading = false;
                this.nzMessageService.error(resp.extras.msg);
              }
            },
            (resp) => {
              this.isAddBtnLoading = false;
              this.nzMessageService.error(resp.error.extras.msg);
            }
          );
        } catch (e) { }
      }
    }
  }
  checkPassword() {
    if (this.updatePasswordForm.value.Password.length > 0) {
      this.passwordValidation = 'validating';
      let body = {
        Password: this.updatePasswordForm.value.Password,
      };
      try {
        this.appService
          .postMethod_admin('Common_Password_Validation', body)

          .subscribe(
            (resp) => {
              if (resp.success) {
                this.updatePasswordForm.get('Password').setErrors(null);
                this.passwordValidation = 'success';
              } else {
              }
            },
            (resp) => {
              this.updatePasswordForm
                .get('Password')
                .setErrors({ pattern: true });
              this.passwordValidation = 'error';
              this.errorTip = resp.error.extras.msg;
            }
          );
      } catch (e) { }
    } else {
      this.passwordValidation = 'null';
    }
  }
}
