import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpRequest, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-client-testimonial',
  templateUrl: './client-testimonial.component.html',
  styleUrls: ['./client-testimonial.component.css']
})
export class ClientTestimonialComponent implements OnInit {
  isAddBtnLoading = false;
  TableList: any = {};
  isVisible = false;
  myForm: any;
  labelWidth = 24
  controlWidth = 24
  isTableLoading: boolean = false;
  ProjectsList: any = []
  isProfileImageUploading: boolean = false;
  ProfileImageData: any = []

  isBackgroundImageUploading: boolean = false;
  BackgroundImageData: any = []
  constructor(
    private fb: FormBuilder,
    public _appService: AppService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.getProjectsList()
    this.myForm = this.fb.group({
      ProjectID: [null, [Validators.required]],
      Main_Description: [null, [Validators.required]],
      Profile_Name: [null, [Validators.required]],
      Profile_Heading: [null, [Validators.required]],
      Profile_Description: [null, [Validators.required]],

    });
    this.getTableList()
  }
  getTableList() {
    this.isTableLoading = true
    let body = {
    }
    try {

      this._appService.postMethod_admin('Fetch_Client_Testimonials', body)
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

  showModal(data: any) {
    this.isVisible = true;
    this.myForm.patchValue({
      Main_Description: data.Main_Description,
      Profile_Name: data.Profile_Name,
      Profile_Heading: data.Profile_Heading,
      Profile_Description: data.Profile_Description,
      ProjectID: data.ProjectID,
    })
    if (data.Whether_Profile_Image_Available) {
      this.ProfileImageData = []
      this.ProfileImageData.push(data.Profile_Image_Information)
    }
    if (data.Whether_Baground_Image_Available) {
      this.BackgroundImageData = []
      this.BackgroundImageData.push(data.Baground_Image_Information)
    }
  }
  OnCancel() {
    this.isAddBtnLoading = false;
    this.isVisible = false;
    this.myForm.reset()
    this.ProfileImageData = []
    this.BackgroundImageData = []
    this.isProfileImageUploading = false
    this.isBackgroundImageUploading = false
  }
  submitForm() {
    this.isAddBtnLoading = true;
    let body = {
      ProjectID: this.myForm.get('ProjectID').value,
      Main_Description: this.myForm.value.Main_Description,
      Profile_Name: this.myForm.value.Profile_Name,
      Profile_Heading: this.myForm.value.Profile_Heading,
      Profile_Description: this.myForm.value.Profile_Description,
      Whether_Profile_Image_Available: this.ProfileImageData.length > 0 ? true : false,
      Profile_ImageID: this.ProfileImageData.length > 0 ? this.ProfileImageData[0].ImageID : '',
      Whether_Baground_Image_Available: this.BackgroundImageData.length > 0 ? true : false,
      Baground_ImageID: this.BackgroundImageData.length > 0 ? this.BackgroundImageData[0].ImageID : '',
    }

    try {

      this._appService.postMethod_admin('Update_Client_Testimonials', body)
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
  getProjectsList() {
    const body = {
      Skip: 0,
      Limit: 10000,

      Whether_Status_Filter: true,
      Status: true,

      Whether_Project_Type_Filter: false,
      Project_Type: '',

      Whether_Search_Filter: false,
      Search_Input: ''
    }
    try {
      this._appService.postMethod_admin('Filter_All_Projects', body)
        .subscribe(resp => {
          if (resp.success) {
            this.ProjectsList = resp.extras.Data
          } else {
            this.nzMessageService.error(resp.extras.msg)
          }
        },
          resp => {
            this.nzMessageService.error(resp.error.extras.msg);
          })
    } catch (e) {

    }
  }
  beforeUploadProfile = (file: any): boolean => {
    this.isProfileImageUploading = true
    this.postMethodImage(file, 1)
    return false;
  }
  beforeUploadBackground = (file: any): boolean => {
    this.isBackgroundImageUploading = true
    this.postMethodImage(file, 2)
    return false;
  }
  postMethodImage(imageFile: any, type: number) {
    const formData = new FormData();
    let url = 'Upload_Image'
    let key = 'image'
    formData.append(key, imageFile);
    const req = new HttpRequest('POST', this._appService.ImageUrl + url, formData, {
      reportProgress: true,
      withCredentials: false
    });
    this._appService.onUploadFile(req)
      .subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            if (type == 1) {
              this.ProfileImageData = []
              this.ProfileImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isProfileImageUploading = false
            } else if (type == 2) {
              this.BackgroundImageData = []
              this.BackgroundImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isBackgroundImageUploading = false
            }


          } else if (event instanceof HttpResponse) {
            this.isProfileImageUploading = false
            this.isBackgroundImageUploading = false
          }
        },
        resp => {
          this.isProfileImageUploading = false
          this.isBackgroundImageUploading = false
          this.nzMessageService.error(resp.error.extras.msg);
        }

      );
  }
}
