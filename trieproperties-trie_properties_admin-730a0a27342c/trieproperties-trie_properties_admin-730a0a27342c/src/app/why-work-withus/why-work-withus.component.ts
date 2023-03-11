import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-why-work-withus',
  templateUrl: './why-work-withus.component.html',
  styleUrls: ['./why-work-withus.component.css']
})
export class WhyWorkWithusComponent implements OnInit {
  isAddBtnLoading = false;
  TableList: any = {};
  isVisible = false;
  myForm: any;
  labelWidth = 24
  controlWidth = 24
  isTableLoading: boolean=false;
  constructor(
    private fb: FormBuilder,
    public _appService: AppService,
    private nzMessageService: NzMessageService,
    
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      Description: [null, [Validators.required]],
      Experience: [null, [Validators.required]],
      Residential_Projects: [null, [Validators.required]],
      Commercial_Projects: [null, [Validators.required]],
      Million_Sq_ft: [null, [Validators.required]],

    });
    this.getTableList()
  }
  getTableList() {
    this.isTableLoading = true
    let body = {
    }
    try {

      this._appService.postMethod_admin('Fetch_Why_Work_Withus_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.isTableLoading = false
            this.TableList = resp.extras.Data
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
      Description: data.Description,
      Experience: data.Experience,
      Residential_Projects: data.Residential_Projects,
      Commercial_Projects: data.Commercial_Projects,
      Million_Sq_ft: data.Million_Sq_ft,
    })
  }
  OnCancel() {
    this.isAddBtnLoading = false;
    this.isVisible = false;
    this.myForm.reset()
  }
  submitForm() {
    this.isAddBtnLoading = true;
    let body = {
      Description: this.myForm.value.Description,
      Experience:this.myForm.value.Experience,
      Residential_Projects:this.myForm.value.Residential_Projects,
      Commercial_Projects:this.myForm.value.Commercial_Projects,
      Million_Sq_ft:this.myForm.value.Million_Sq_ft,
    }

    try {

      this._appService.postMethod_admin('Update_Why_Work_Withus_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.OnCancel()
            this.nzMessageService.success(resp.extras.Status)
            this.getTableList()
          } else {
            this.isAddBtnLoading = false;
            this.nzMessageService.error(resp.extras.msg)

          }
        },
          resp => {
            this.isAddBtnLoading = false;
            this.nzMessageService.error(resp.error.extras.msg)
          })
    } catch (e) { }
  }
}
