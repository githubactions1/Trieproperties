import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  isAppVersionLoadin = false;
  AppVersionList: any = {};
  isVisible = false;
  myForm: any;
  labelWidth = 6
  controlWidth = 16
  isTableLoading: boolean=false;
  constructor(
    private fb: FormBuilder,
    public _appService: AppService,
    private nzMessageService: NzMessageService,
    
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      Address: [null, [Validators.required]],
      Phone_Number: [null, [Validators.required]],
      EmailID: [null, [Validators.required]],

    });
    this.getTableList()
  }
  getTableList() {
    this.isTableLoading = true
    let body = {
    }
    try {

      this._appService.postMethod_admin('Fetch_Contact_Us_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.isTableLoading = false
            this.AppVersionList = resp.extras.Data
          } else {
            this.isTableLoading = false
            this.nzMessageService.error(resp.extras.msg)
          }
        },
          resp => {
            this.isTableLoading = false
            this.nzMessageService.error(resp.error.extras.msg)
          })
    } catch (e) { }
  }

  showModal(data:any) {
    this.isVisible = true;
    this.myForm.patchValue({
      Address: data.Address,
      Phone_Number: data.Phone_Number,
      EmailID: data.EmailID,
    })
  }
  OnCancel() {
    this.isAppVersionLoadin = false;
    this.isVisible = false;
    this.myForm.reset()
  }
  submitForm() {
    this.isAppVersionLoadin = true;
    let body = {
      Address: this.myForm.value.Address,
      Phone_Number:this.myForm.value.Phone_Number,
      EmailID:this.myForm.value.EmailID,
    }

    try {

      this._appService.postMethod_admin('Update_Contact_Us_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.OnCancel()
            this.nzMessageService.success(resp.extras.Status)
            this.getTableList()
          } else {
            this.isAppVersionLoadin = false;
            this.nzMessageService.error(resp.extras.msg)

          }
        },
          resp => {
            this.isAppVersionLoadin = false;
            this.nzMessageService.error(resp.error.extras.msg)
          })
    } catch (e) { }
  }
}
