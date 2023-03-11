import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isModalView: boolean = false;
  myForm: any = FormGroup
  isAddBtnLoading: boolean = false;
  projectsData: any = []

  constructor(
    private router: Router,
    private AppService: AppService,
    private nzMessageService: NzMessageService,
  ) {

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      EmailID: new FormControl(null, [Validators.required]),
      Phone_Number: new FormControl(null, [Validators.required]),
      ProjectID: new FormControl(null, [Validators.required]),
    })
  }
  onClick(type: number) {
    if (type == 1) {
      this.router.navigateByUrl('/');
      window.scroll({ top: 0, behavior: 'smooth' })
    }
    else if (type == 3) {
      this.router.navigateByUrl('our-projects');
      window.scroll({ top: 0, behavior: 'smooth' })
    }
    else if (type == 6) {
      this.router.navigateByUrl('blog');
      window.scroll({ top: 0, behavior: 'smooth' })
    }
    else if (type == 7) {
      this.router.navigateByUrl('contact-us');
      window.scroll({ top: 0, behavior: 'smooth' })
    }
    else if (type == 8) {
      this.isModalView = true
      this.getProjectsList()

    }

  }
  getProjectsList() {
    const body = {
      Skip: 0,
      Limit: 100000,
      Whether_Project_Type_Filter: false,
      Project_Type: ''
    };

    try {

      this.AppService.postMethod('Filter_All_Projects', body)
        .subscribe(resp => {
          if (resp.success) {
            this.projectsData = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
  onCancelModal() {
    this.isModalView = false
    this.isAddBtnLoading = false
    this.myForm.reset()
  }
  onSubmitForm() {
    this.isAddBtnLoading = true
    const body = {
      Name: this.myForm.value.Name,
      EmailID: this.myForm.value.EmailID,
      Phone_Number: this.myForm.value.Phone_Number,
      ProjectID: this.myForm.get('ProjectID').value
    };

    try {

      this.AppService.postMethod('Submit_Book_A_Visit_Form', body)
        .subscribe(resp => {
          if (resp.success) {

            this.nzMessageService.success(resp.extras.Status)
            this.onCancelModal()
          } else {
            this.isAddBtnLoading = false

            this.nzMessageService.error(resp.extras.msg)

          }
        },
          (resp: any) => {
            this.isAddBtnLoading = false

            this.nzMessageService.error(resp.error.extras.msg)

          });
    } catch (e) { }
  }
}
