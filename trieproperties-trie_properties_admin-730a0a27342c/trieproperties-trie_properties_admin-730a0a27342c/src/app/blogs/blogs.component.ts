import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../app.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  isActiveList = true
  skip = 0;
  limit = this._appService.limit;
  currentPage = 1;
  TotalItems: any;
  isTableloading: boolean = false;
  tableData: any = []

  addForm: any = FormGroup
  isEditing: boolean = false;
  isAdding: boolean = false;
  isAddBtnLoading: boolean = false;
  selectedData: any;

  isWebImageUploading: boolean = false;
  WebImageData: any = []
  isMobileImageUploading: boolean = false;
  MobileImageData: any = []

  constructor(
    private nzMessageService: NzMessageService,
    public _appService: AppService
  ) { }

  ngOnInit() {
    this.isActiveList = true
    this.onChangeStatus()
    this.addForm = new FormGroup({
      Blog_Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
    })
  }
  onChangeStatus() {
    this.skip = 0
    this.getTableList()
  }
  getTableList() {
    const body = {
      Skip: this.skip,
      Limit: this.limit,

      Whether_Status_Filter: true,
      Status: this.isActiveList,
    }
    try {
      this.isTableloading = true;
      this._appService.postMethod_admin('Filter_All_Blogs', body)
        .subscribe(resp => {
          if (resp.success) {
            this.isTableloading = false;
            if (this.skip == 0) {
              this.currentPage = 1
              this.TotalItems = resp.extras.Count
            }
            this.TotalItems = resp.extras.Count
            this.tableData = resp.extras.Data
          } else {
            this.isTableloading = false;
            this.nzMessageService.error(resp.extras.msg)
          }
        },
          resp => {
            this.isTableloading = false;
            this.nzMessageService.error(resp.error.extras.msg);
          })
    } catch (e) {

    }
  }
  onNextPage(event: number) {
    this.currentPage = event
    this.skip = (event - 1) * this.limit
    this.getTableList()
  }
  onAdd() {
    this.isEditing = false
    this.isAdding = true
  }
  onEdit(data: any) {
    this.isEditing = true
    this.isAdding = true
    this.selectedData = data
    this.addForm.patchValue({
      Blog_Name: this.selectedData.Blog_Name,
      Description: this.selectedData.Description,
    }, { emitEvent: false })
    if (this.selectedData.Whether_Mobile_Image_Available) {
      this.MobileImageData = []
      this.MobileImageData.push(this.selectedData.Mobile_Image_Information)
    }
    if (this.selectedData.Whether_Web_Image_Available) {
      this.WebImageData = []
      this.WebImageData.push(this.selectedData.Web_Image_Information)
    }
  }
  onClose() {
    this.isEditing = false
    this.isAdding = false
    this.isAddBtnLoading = false
    this.addForm.reset()
    this.WebImageData = []
    this.MobileImageData = []
    this.isWebImageUploading = false
    this.isMobileImageUploading = false

  }
  onsubmit() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.isAddBtnLoading = true
      let body = {}
      let url = ''
      if (this.isEditing) {
        body = {
          BlogID: this.selectedData.BlogID,

          Blog_Name: this.addForm.value.Blog_Name,
          Description: this.addForm.value.Description,

          Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
          Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

          Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
          Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : '',

        }
        url = 'Update_Blog'
      }
      else {
        body = {
          Blog_Name: this.addForm.value.Blog_Name,
          Description: this.addForm.value.Description,

          Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
          Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

          Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
          Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : '',

        }
        url = 'Create_Blog'
      }
      try {

        this._appService.postMethod_admin(url, body)
          .subscribe((resp: any) => {
            if (resp.success) {
              this.onClose()
              this.getTableList()
              this.nzMessageService.success(resp.extras.Status)


            } else {
              this.isAddBtnLoading = false
              this.nzMessageService.error(resp.extras.msg)
            }
          },
            resp => {
              this.isAddBtnLoading = false
              this.nzMessageService.error(resp.error.extras.msg)
            })
      } catch (e) { }
    }
  }
  beforeUploadWeb = (file: any): boolean => {
    this.isWebImageUploading = true
    this.postMethodImage(file, 1)
    return false;
  }
  beforeUploadMobile = (file: any): boolean => {
    this.isMobileImageUploading = true
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
              this.WebImageData = []
              this.WebImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isWebImageUploading = false
            } else if (type == 2) {
              this.MobileImageData = []
              this.MobileImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isMobileImageUploading = false
            }


          } else if (event instanceof HttpResponse) {
            this.isWebImageUploading = false
            this.isMobileImageUploading = false
          }
        },
        resp => {
          this.isWebImageUploading = false
          this.isMobileImageUploading = false
          this.nzMessageService.error(resp.error.extras.msg);
        }

      );
  }
  onAction(data: any) {
    let url = ''
    if (data.Status) {
      url = 'Inactive_Blog'
    } else {
      url = 'Active_Blog'
    }


    let body = {
      BlogID: data.BlogID,

    }
    try {
      this._appService.postMethod_admin(url, body)
        .subscribe(resp => {
          if (resp.success) {
            let msg;
            if (data.Status) {
              msg = 'Inactivated Successfully'
            } else {
              msg = 'Activated Successfully'
            }
            this.nzMessageService.success(msg)
            this.getTableList()
          } else {
            this.nzMessageService.error(resp.extras.msg)

          }
        },
          resp => {

            this.nzMessageService.error(resp.error.extras.msg);
          })
    } catch (e) { }


  }
}
