import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-Contact-us',
  templateUrl: './Contact-us.component.html',
  styleUrls: ['./Contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  myForm: any = FormGroup
  ContactInfo: any = {};
  constructor(private AppService: AppService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.getContactUs()
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

            this.nzMessageService.error(resp.extras.msg)

          }
        },
          (resp: any) => {
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
}
