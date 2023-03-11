import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-Product-detail-view',
  templateUrl: './Product-detail-view.component.html',
  styleUrls: ['./Product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit {
  ContactInfo:any = {}
  myForm: any = FormGroup
  currentUrl: string = '';
  ProjectInfo: any={};

  constructor(
    private router: Router,
    private AppService: AppService,
    private nzMessageService: NzMessageService,
  ) { 
    let activatedUrl: string = router.url
    let preferenceUrl = activatedUrl.split('/')

    let generatedUrl: string = preferenceUrl[2]
    this.currentUrl = generatedUrl
  }

  ngOnInit() {
    this.getContactUs()
    this.getProjectInfo()
    this.myForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      EmailID: new FormControl(null, [Validators.required]),
      Phone_Number: new FormControl(null, [Validators.required]),
      Message: new FormControl(null, [Validators.required]),
    })
  }
  onSubmitForm() {
    const body = {
      Name: this.myForm.value.Name,
      EmailID: this.myForm.value.EmailID,
      Phone_Number: this.myForm.value.Phone_Number,
      Message: this.myForm.value.Message
    };

    try {

      this.AppService.postMethod('Submit_Contact_Form', body)
        .subscribe(resp => {
          if (resp.success) {
            this.nzMessageService.success(resp.extras.Status)
            this.myForm.reset()

          } else {
            console.log("Eneering else")

            this.nzMessageService.error(resp.extras.msg)

          }
        },
          (resp: any) => {
            console.log("Eneering")
            this.nzMessageService.error(resp.error.extras.msg)

          });
    } catch (e) { }
  }
  getContactUs() {
    const body = {
    };

    try {

      this.AppService.postMethod('Fetch_Contact_Us_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.ContactInfo = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
  getProjectInfo() {
    const body = {
      ProjectID:this.currentUrl
    };

    try {

      this.AppService.postMethod('Fetch_Project_Complete_Information', body)
        .subscribe(resp => {
          if (resp.success) {
            this.ProjectInfo = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
}
