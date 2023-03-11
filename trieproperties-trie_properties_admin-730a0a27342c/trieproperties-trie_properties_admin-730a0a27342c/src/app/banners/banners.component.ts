import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../app.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  isActiveList = true
  skip = 0;
  limit = this._appService.limit;
  currentPage = 1;
  TotalItems: any;
  isTableloading: boolean = false;
  tableData: any = []
  Search: any = new FormControl('')
  isVisible: boolean = false;


  isEditing: boolean = false;
  isAdding: boolean = false;
  selectedData: any = {};
  isAddBtnLoading: boolean = false;
  addForm: any = FormGroup

  isWebImageUploading: boolean = false;
  WebImageData: any = []
  MobileImageData: any = []
  isMobileImageUploading: boolean = false;

  constructor(
    private nzMessageService: NzMessageService,
    public _appService: AppService
  ) { }

  ngOnInit() {
    this.isActiveList = true
    this.onChangeStatus()
    this.Search.valueChanges.subscribe((data: any) => {
      this.skip = 0
      this.getTableList()
    })
    this.addForm = new FormGroup({
      Banner_No: new FormControl(null, [Validators.required]),
      Banner_Title: new FormControl(null, [Validators.required]),
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

      Whether_Search_Filter: this.Search.value.length > 0 ? true : false,
      Search: this.Search.value,

      Whether_Banner_Type_Filter: false,
      Banner_Type: ''
    }
    try {
      this.isTableloading = true;
      this._appService.postMethod_admin('Filter_All_Banners', body)
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
  onAction(data: any) {
    let url = '';
    if (data.Status) {
      url = 'Inactive_Banner';
    } else {
      url = 'Active_Banner';
    }
    let body = {
      BannerID: data.BannerID,
    };
    try {
      this._appService.postMethod_admin(url, body).subscribe(
        (resp) => {
          if (resp.success) {
            let msg;
            if (data.Status) {
              msg = 'Inactivated Successfully';
            } else {
              msg = 'Activated Successfully';
            }
            this.nzMessageService.success(msg);
            this.getTableList();
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

  onAdd() {
    this.isEditing = false
    this.isAdding = true
  }
  onEdit(data: any) {
    this.isEditing = true
    this.isAdding = true
    this.selectedData = data
    this.addForm.patchValue({
      Banner_Title: this.selectedData.Banner_Title,
      Banner_No: this.selectedData.Banner_No,
      Banner_Type: 1,
    }, { emitEvent: false })
    if (this.selectedData.Whether_Web_Image_Available) {
      this.WebImageData = []
      this.WebImageData.push(this.selectedData.Web_Image_Information)
    }
    if (this.selectedData.Whether_Mobile_Image_Available) {
      this.MobileImageData = []
      this.MobileImageData.push(this.selectedData.Mobile_Image_Information)
    }
  }
  onClose() {
    this.isEditing = false
    this.isAdding = false
    this.isAddBtnLoading = false
    this.addForm.reset()
    this.WebImageData = []
    this.MobileImageData = []
  }
  onsubmit() {
    this.isAddBtnLoading = true
    let body = {}
    let url = ''
    if (this.isEditing) {
      body = {
        BannerID: this.selectedData.BannerID,
        Banner_No: this.addForm.value.Banner_No,
        Banner_Type: 1,
        Banner_Title: this.addForm.value.Banner_Title,

        Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
        Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

        Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
        Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : ''
      }
      url = 'Update_Banner'
    }
    else {
      body = {
        Banner_No: this.addForm.value.Banner_No,
        Banner_Type: 1,
        Banner_Title: this.addForm.value.Banner_Title,
        Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
        Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

        Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
        Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : ''
      }
      url = 'Create_Banner'
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
  postMethodImage(imageFile: any, type: any) {
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
              this.nzMessageService.success('Web Image Upoladed Sucessfully')
              this.isWebImageUploading = false
            } else if (type == 2) {
              this.MobileImageData = []
              this.MobileImageData.push(event.body.extras)
              this.nzMessageService.success('Mobile Image Upoladed Sucessfully')
              this.isMobileImageUploading = false
            }


          } else if (event instanceof HttpResponse) {

          }
        },
        resp => {
          this.nzMessageService.error(resp.error.extras.msg);
        }

      );
  }
}
