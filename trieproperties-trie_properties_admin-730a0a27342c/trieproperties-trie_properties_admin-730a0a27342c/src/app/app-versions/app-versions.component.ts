import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-app-versions',
  templateUrl: './app-versions.component.html',
  styleUrls: ['./app-versions.component.css']
})
export class AppVersionsComponent implements OnInit {
  isAppVersionLoadin = false;
  AppVersionList: any = {};
  isVisible = false;
  AppVersionFrom: any;
  labelWidth = 10
  controlWidth = 12
  isTableLoading: boolean=false;
  constructor(
    private fb: FormBuilder,
    public _appService: AppService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.AppVersionFrom = this.fb.group({
      Application_Android_Version: [null, [Validators.required]],
      Application_IOS_Version: [null, [Validators.required]],

    });
    this.getAppVersionList()
  }
  getAppVersionList() {
    this.isTableLoading = true
    let body = {
    }
    try {

      this._appService.postMethod_admin('Fetch_App_Versions_Settings', body)
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
    this.AppVersionFrom.patchValue({
      Application_Android_Version: data.Application_Android_Version,
      Application_IOS_Version: data.Application_IOS_Version,
    })
  }
  OnCancel() {
    this.isAppVersionLoadin = false;
    this.isVisible = false;
  }
  submitForm() {
    this.isAppVersionLoadin = true;
    let body = {
      Application_Android_Version: +(this.AppVersionFrom.value.Application_Android_Version),
      Application_IOS_Version: +(this.AppVersionFrom.value.Application_IOS_Version),
    }

    try {

      this._appService.postMethod_admin('Update_App_Versions_Settings', body)
        .subscribe(resp => {
          if (resp.success) {
            this.OnCancel()
            this.nzMessageService.success(resp.extras.Status)
            this.getAppVersionList()
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
