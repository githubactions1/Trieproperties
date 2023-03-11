import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../app.service';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpRequest, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-Projects',
  templateUrl: './Projects.component.html',
  styleUrls: ['./Projects.component.css']
})
export class ProjectsComponent implements OnInit {
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

  // isWebArrayImageUploading: boolean = false;
  // WebArrayImageData: any = []

  isprojectImageUploading: boolean = false;
  ProjectHighlightImageData: any = []

  islocationImageUploading: boolean = false;
  LocationHighlightImageData: any = []

  isbannerImageUploading: boolean = false;
  BannerImageData: any = []

  isamenityImageUploading: boolean = false;
  AmenityImageData: any = []

  // isMobileArrayImageUploading: boolean = false;
  // MobileArrayImageData: any = []

  // isDocumentUploading: boolean = false;
  // DocumentData: any = []
  Project_Type = new FormControl(null)
  Search: any = new FormControl('')
  constructor(
    private nzMessageService: NzMessageService,
    public _appService: AppService
  ) { }

  ngOnInit() {
    this.Project_Type.valueChanges.subscribe((data: any) => {
      this.skip = 0
      this.getTableList()
    })
    this.Search.valueChanges.subscribe((data: any) => {
      this.skip = 0
      this.getTableList()
    })
    this.isActiveList = true
    this.onChangeStatus()
    this.addForm = new FormGroup({
      Project_Type: new FormControl(null, [Validators.required]),
      Project_Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      Project_Highlights: new FormArray([], [Validators.required]),
      Location_Highlights: new FormArray([], [Validators.required]),
      Amenities_Highlights: new FormArray([], [Validators.required]),
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

      Whether_Project_Type_Filter: this.Project_Type.value == null ? false : true,
      Project_Type: this.Project_Type.value,

      Whether_Search_Filter: this.Search.value.length > 0 ? true : false,
      Search_Input: this.Search.value
    }
    try {
      this.isTableloading = true;
      this._appService.postMethod_admin('Filter_All_Projects', body)
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
    this.addControls()
    this.addLocationControls()
    this.addAmenityControls()
  }
  onEdit(data: any) {
    this.isEditing = true
    this.isAdding = true
    this.selectedData = data
    let highlightsArray = this.selectedData.Project_Highlights
    for (let i = 0; i < highlightsArray.length; i++) {
      this.addControls()
    }
    let Highlights = []
    Highlights = this.selectedData.Project_Highlights
    let numbers: any = []
    Highlights.forEach((item: any) => {
      numbers.push({
        Highlight: item
      })
    })

    let locationhighlightsArray = this.selectedData.Location_Highlights == undefined ? [] : this.selectedData.Location_Highlights
    for (let i = 0; i < locationhighlightsArray.length; i++) {
      this.addLocationControls()
    }
    let LocationHighlights = []
    LocationHighlights = this.selectedData.Location_Highlights == undefined ? [] : this.selectedData.Location_Highlights
    let Locationnumbers: any = []
    LocationHighlights.forEach((item: any) => {
      Locationnumbers.push({
        Location_Highlight: item
      })
    })
    let amenitieshighlightsArray = this.selectedData.Amenities_Highlights == undefined ? [] : this.selectedData.Amenities_Highlights
    for (let i = 0; i < amenitieshighlightsArray.length; i++) {
      this.addAmenityControls()
    }
    let AmenitiesHighlights = []
    AmenitiesHighlights = this.selectedData.Amenities_Highlights == undefined ? [] : this.selectedData.Amenities_Highlights
    let Amenitiesnumbers: any = []
    AmenitiesHighlights.forEach((item: any) => {
      Amenitiesnumbers.push({
        Amenity_Highlight: item
      })
    })
    this.addForm.patchValue({
      Project_Type: this.selectedData.Project_Type,
      Project_Name: this.selectedData.Project_Name,
      Description: this.selectedData.Description,
      Project_Highlights: numbers,
      Location_Highlights: Locationnumbers,
      Amenities_Highlights: Amenitiesnumbers,
    }, { emitEvent: false })
    if (this.selectedData.Whether_Mobile_Image_Available) {
      this.MobileImageData = []
      this.MobileImageData.push(this.selectedData.Mobile_Image_Information)
    }
    if (this.selectedData.Whether_Web_Image_Available) {
      this.WebImageData = []
      this.WebImageData.push(this.selectedData.Web_Image_Information)
    }
    // if (this.selectedData.Whether_Web_Image_Array_Available) {
    //   this.WebArrayImageData = []
    //   this.WebArrayImageData = this.selectedData.Web_Image_Array_Information
    // }
    if (this.selectedData.Whether_Project_Highlights_Image_Available) {
      this.ProjectHighlightImageData = []
      this.ProjectHighlightImageData.push(this.selectedData.Project_Highlights_Image_Information)
    }
    if (this.selectedData.Whether_Location_Highlights_Image_Available) {
      this.LocationHighlightImageData = []
      this.LocationHighlightImageData.push(this.selectedData.Location_Highlights_Image_Information)
    }
    if (this.selectedData.Whether_Baground_Image_Available) {
      this.BannerImageData = []
      this.BannerImageData.push(this.selectedData.Baground_Image_Information)
    }
    if (this.selectedData.Whether_Amenities_Highlights_Image_Available) {
      this.AmenityImageData = []
      this.AmenityImageData.push(this.selectedData.Amenities_Highlights_Image_Information)
    }
    // if (this.selectedData.Whether_Mobile_Image_Array_Available) {
    //   this.MobileArrayImageData = []
    //   this.MobileArrayImageData = this.selectedData.Mobile_Image_Array_Information
    // }
    // if (this.selectedData.Whether_Document_Array_Available) {
    //   this.DocumentData = []
    //   this.DocumentData = this.selectedData.Document_Array
    // }
  }
  onClose() {
    this.isEditing = false
    this.isAdding = false
    this.isAddBtnLoading = false
    this.addForm.reset()
    this.WebImageData = []
    this.MobileImageData = []
    // this.WebArrayImageData = []
    this.ProjectHighlightImageData = []
    this.LocationHighlightImageData = []
    this.BannerImageData = []
    this.AmenityImageData = []
    // this.MobileArrayImageData = []
    // this.DocumentData = []
    this.isWebImageUploading = false
    this.isMobileImageUploading = false
    // this.isWebArrayImageUploading = false
    this.isprojectImageUploading = false
    this.islocationImageUploading = false
    this.isbannerImageUploading = false
    this.isamenityImageUploading = false
    // this.isMobileArrayImageUploading = false
    // this.isDocumentUploading = false
    const control = this.addForm.controls.Project_Highlights as FormArray;
    control.clear()
    const control1 = this.addForm.controls.Location_Highlights as FormArray;
    control1.clear()
    const control2 = this.addForm.controls.Amenities_Highlights as FormArray;
    control2.clear()
  }
  // removeImage(type: number, j?: number) {
  //   if (type == 1) {
  //     this.WebArrayImageData.splice(j, 1);
  //   }
  //   // else if (type == 2) {
  //   //   this.MobileArrayImageData.splice(j, 1);

  //   // } else if (type == 3) {
  //   //   this.DocumentData.splice(j, 1)
  //   // }
  //   this.nzMessageService.success("Removed Successfully")
  // }
  onsubmit() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    // if (this.addForm.valid) {
    this.isAddBtnLoading = true
    let body = {}
    let url = ''
    let selectedHighlights = []
    selectedHighlights = this.addForm.value.Project_Highlights
    let backendNumbers: any = []
    selectedHighlights.forEach((item: any) => {
      backendNumbers.push(item.Highlight)
    })
    let selectedLocationHighlights = []
    selectedLocationHighlights = this.addForm.value.Location_Highlights
    let backendLocationNumbers: any = []
    selectedLocationHighlights.forEach((item: any) => {
      backendLocationNumbers.push(item.Location_Highlight)
    })
    let selectedAmenitiesHighlights = []
    selectedAmenitiesHighlights = this.addForm.value.Amenities_Highlights
    let backendAmenitiesNumbers: any = []
    selectedAmenitiesHighlights.forEach((item: any) => {
      backendAmenitiesNumbers.push(item.Amenity_Highlight)
    })
    if (this.isEditing) {
      body = {
        ProjectID: this.selectedData.ProjectID,

        Project_Type: this.addForm.get('Project_Type').value,
        Project_Name: this.addForm.value.Project_Name,
        Description: this.addForm.value.Description,
        Project_Highlights: backendNumbers,
        Location_Highlights: backendLocationNumbers,
        Amenities_Highlights: backendAmenitiesNumbers,

        Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
        Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

        Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
        Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : '',

        Whether_Project_Highlights_Image_Available: this.ProjectHighlightImageData.length > 0 ? true : false,
        Project_Highlights_ImageID: this.ProjectHighlightImageData.length > 0 ? this.ProjectHighlightImageData[0].ImageID : '',

        Whether_Location_Highlights_Image_Available: this.LocationHighlightImageData.length > 0 ? true : false,
        Location_Highlights_ImageID: this.LocationHighlightImageData.length > 0 ? this.LocationHighlightImageData[0].ImageID : '',

        Whether_Baground_Image_Available: this.BannerImageData.length > 0 ? true : false,
        Baground_ImageID: this.BannerImageData.length > 0 ? this.BannerImageData[0].ImageID : '',

        Whether_Amenities_Highlights_Image_Available: this.AmenityImageData.length > 0 ? true : false,
        Amenities_Highlights_ImageID: this.AmenityImageData.length > 0 ? this.AmenityImageData[0].ImageID : '',

        Whether_Mobile_Image_Array_Available: false,
        Mobile_ImageID_Array: [],
        // Whether_Mobile_Image_Array_Available: this.MobileArrayImageData.length > 0 ? true : false,
        // Mobile_ImageID_Array: this.MobileArrayImageData.length > 0 ? this.MobileArrayImageData : '',

        // Whether_Web_Image_Array_Available: this.WebArrayImageData.length > 0 ? true : false,
        // Web_ImageID_Array: this.WebArrayImageData.length > 0 ? this.WebArrayImageData.map((data: any) => data.ImageID) : '',
        Whether_Web_Image_Array_Available: false,
        Web_ImageID_Array: [],


        Whether_Document_Array_Available: false,
        Document_Array: [],
        // Whether_Document_Array_Available: this.DocumentData.length > 0 ? true : false,
        // Document_Array: this.DocumentData.length > 0 ? this.DocumentData.map((data: any) => { data.DocumentID }) : '',
      }
      url = 'Update_Project'
    }
    else {
      body = {
        Project_Type: this.addForm.get('Project_Type').value,
        Project_Name: this.addForm.value.Project_Name,
        Description: this.addForm.value.Description,
        Project_Highlights: backendNumbers,
        Location_Highlights: backendLocationNumbers,
        Amenities_Highlights: backendAmenitiesNumbers,

        Whether_Mobile_Image_Available: this.MobileImageData.length > 0 ? true : false,
        Mobile_ImageID: this.MobileImageData.length > 0 ? this.MobileImageData[0].ImageID : '',

        Whether_Web_Image_Available: this.WebImageData.length > 0 ? true : false,
        Web_ImageID: this.WebImageData.length > 0 ? this.WebImageData[0].ImageID : '',

        Whether_Project_Highlights_Image_Available: this.ProjectHighlightImageData.length > 0 ? true : false,
        Project_Highlights_ImageID: this.ProjectHighlightImageData.length > 0 ? this.ProjectHighlightImageData[0].ImageID : '',

        Whether_Location_Highlights_Image_Available: this.LocationHighlightImageData.length > 0 ? true : false,
        Location_Highlights_ImageID: this.LocationHighlightImageData.length > 0 ? this.LocationHighlightImageData[0].ImageID : '',

        Whether_Baground_Image_Available: this.BannerImageData.length > 0 ? true : false,
        Baground_ImageID: this.BannerImageData.length > 0 ? this.BannerImageData[0].ImageID : '',

        Whether_Amenities_Highlights_Image_Available: this.AmenityImageData.length > 0 ? true : false,
        Amenities_Highlights_ImageID: this.AmenityImageData.length > 0 ? this.AmenityImageData[0].ImageID : '',

        Whether_Mobile_Image_Array_Available: false,
        Mobile_ImageID_Array: [],
        // Whether_Mobile_Image_Array_Available: this.MobileArrayImageData.length > 0 ? true : false,
        // Mobile_ImageID_Array: this.MobileArrayImageData.length > 0 ? this.MobileArrayImageData.map((data: any) => data.ImageID) : '',

        // Whether_Web_Image_Array_Available: this.WebArrayImageData.length > 0 ? true : false,
        // Web_ImageID_Array: this.WebArrayImageData.length > 0 ? this.WebArrayImageData.map((data: any) => data.ImageID) : '',
        Whether_Web_Image_Array_Available: false,
        Web_ImageID_Array: [],

        Whether_Document_Array_Available: false,
        Document_Array: [],
        // Whether_Document_Array_Available: this.DocumentData.length > 0 ? true : false,
        // Document_Array: this.DocumentData.length > 0 ? this.DocumentData.map((data: any) => { data.DocumentID }) : '',

      }
      url = 'Create_Project'
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
    // }
  }
  addControls() {
    const control = <FormArray>this.addForm.controls['Project_Highlights'];
    control.push(this.onPushArrayControls());
  }
  onRemoveControls(j: number) {
    const control = <FormArray>this.addForm.controls['Project_Highlights'];
    control.removeAt(j);
  }
  onPushArrayControls() {
    return new FormGroup({
      Highlight: new FormControl(null, [Validators.required]),
    });

  }
  get arrayControls() {
    return this.addForm.get('Project_Highlights');
  }
  addLocationControls() {
    const control = <FormArray>this.addForm.controls['Location_Highlights'];
    control.push(this.onPushLocationArrayControls());
  }
  onRemoveLocationControls(j: number) {
    const control = <FormArray>this.addForm.controls['Location_Highlights'];
    control.removeAt(j);
  }
  onPushLocationArrayControls() {
    return new FormGroup({
      Location_Highlight: new FormControl(null, [Validators.required]),
    });

  }
  get LocationarrayControls() {
    return this.addForm.get('Location_Highlights');
  }
  addAmenityControls() {
    const control = <FormArray>this.addForm.controls['Amenities_Highlights'];
    control.push(this.onPushAmenityArrayControls());
  }
  onRemoveAmenityControls(j: number) {
    const control = <FormArray>this.addForm.controls['Amenities_Highlights'];
    control.removeAt(j);
  }
  onPushAmenityArrayControls() {
    return new FormGroup({
      Amenity_Highlight: new FormControl(null, [Validators.required]),
    });

  }
  get AmenityarrayControls() {
    return this.addForm.get('Amenities_Highlights');
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
  // beforeUploadWebArray = (file: any): boolean => {
  //   this.isWebArrayImageUploading = true
  //   this.postMethodImage(file, 3)
  //   return false;
  // }
  beforeUploadprojecthighlight = (file: any): boolean => {
    this.isprojectImageUploading = true
    this.postMethodImage(file, 4)
    return false;
  }
  beforeUploadlocationhighlight = (file: any): boolean => {
    this.islocationImageUploading = true
    this.postMethodImage(file, 5)
    return false;
  }
  beforeUploadbanner = (file: any): boolean => {
    this.isbannerImageUploading = true
    this.postMethodImage(file, 6)
    return false;
  }
  beforeUploadamenity = (file: any): boolean => {
    this.isamenityImageUploading = true
    this.postMethodImage(file, 7)
    return false;
  }
  // beforeUploadMobileArray = (file: any): boolean => {
  //   this.isMobileArrayImageUploading = true
  //   this.postMethodImage(file, 4)
  //   return false;
  // }
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
            else if (type == 3) {
              // this.WebArrayImageData.push(event.body.extras)
              // this.nzMessageService.success(' Image Upoladed Sucessfully')
              // this.isWebArrayImageUploading = false
            }
            else if (type == 4) {
              this.ProjectHighlightImageData = []
              this.ProjectHighlightImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isprojectImageUploading = false
            }
            else if (type == 5) {
              this.LocationHighlightImageData = []
              this.LocationHighlightImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.islocationImageUploading = false
            }
            else if (type == 6) {
              this.BannerImageData = []
              this.BannerImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isbannerImageUploading = false
            }
            else if (type == 7) {
              this.AmenityImageData = []
              this.AmenityImageData.push(event.body.extras)
              this.nzMessageService.success(' Image Upoladed Sucessfully')
              this.isamenityImageUploading = false
            }
            // else if (type == 4) {
            //   this.MobileArrayImageData.push(event.body.extras)
            //   this.nzMessageService.success(' Image Upoladed Sucessfully')
            //   this.isMobileArrayImageUploading = false
            // }

          } else if (event instanceof HttpResponse) {
            this.isWebImageUploading = false
            this.isMobileImageUploading = false
            // this.isWebArrayImageUploading = false
            this.isprojectImageUploading = false
            this.islocationImageUploading = false
            this.isbannerImageUploading = false
            this.isamenityImageUploading = false
            // this.isMobileArrayImageUploading = false

          }
        },
        resp => {
          this.isWebImageUploading = false
          this.isMobileImageUploading = false
          // this.isWebArrayImageUploading = false
          this.isprojectImageUploading = false
          this.islocationImageUploading = false
          this.isbannerImageUploading = false
          this.isamenityImageUploading = false
          // this.isMobileArrayImageUploading = false

          this.nzMessageService.error(resp.error.extras.msg);
        }

      );
  }
  // beforeUploadDocument = (file: any): boolean => {
  //   this.isDocumentUploading = true
  //   this.postMethodDocumet(file)
  //   return false;
  // }
  // postMethodDocumet(imageFile: any,) {
  //   const formData = new FormData();
  //   let url = 'Upload_Document'
  //   let key = 'file'
  //   formData.append(key, imageFile);
  //   const req = new HttpRequest('POST', this._appService.ImageUrl + url, formData, {
  //     reportProgress: true,
  //     withCredentials: false
  //   });
  //   this._appService.onUploadFile(req)
  //     .subscribe(
  //       (event: any) => {
  //         if (event instanceof HttpResponse) {

  //           this.DocumentData.push(event.body.extras)
  //           this.nzMessageService.success(' Document Upoladed Sucessfully')
  //           this.isDocumentUploading = false

  //         } else if (event instanceof HttpResponse) {
  //           this.isDocumentUploading = false
  //         }
  //       },
  //       resp => {
  //         this.isDocumentUploading = false
  //         this.nzMessageService.error(resp.error.extras.msg);
  //       }

  //     );
  // }
  onAction(data: any) {
    let url = ''
    if (data.Status) {
      url = 'Inactive_Project'
    } else {
      url = 'Active_Project'
    }


    let body = {
      ProjectID: data.ProjectID,

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
