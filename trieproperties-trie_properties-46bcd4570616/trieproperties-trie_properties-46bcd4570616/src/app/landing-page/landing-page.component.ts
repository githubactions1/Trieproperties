import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  myForm: any = FormGroup
  blogsData: any = []
  projectsData: any = []
  ContactInfo: any = {}
  whyWorkWithUs: any;
  BannersList: any=[];
  ClientTestimonialData:any = {}
  constructor(
    private router: Router,
    private AppService: AppService,
    private nzMessageService: NzMessageService,
    private CookieService: CookieService
  ) {
    this.AppService.ApikeyEmitter.subscribe((data: any) => {
      this.getContactUs()
      this.getWhyWorkwithus()
      this.getBannersList()
      this.getClientTestimonial()

      this.getBlogsList()
      this.getProjectsList()
    })
    // if (this.CookieService.check('triePropertiesApiKey')) {
    //   console.log("Entering")
    //   this.getContactUs()
    //   this.getWhyWorkwithus()
    //   this.getBannersList()

    //   this.getBlogsList()
    //   this.getProjectsList()

    // } else {
    //   // this._appService.splashScreenEventEmiter.subscribe((data: any) => {
    //   //   this.getBannersData()
    //   // })
    // }

  }

  ngOnInit() {
    this.getContactUs()
    this.getWhyWorkwithus()
    this.getBannersList()
    this.getClientTestimonial()

    this.getBlogsList()
    this.getProjectsList()
    this.myForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      EmailID: new FormControl(null, [Validators.required]),
      Phone_Number: new FormControl(null, [Validators.required]),
      Message: new FormControl(null, [Validators.required]),
    })

  }
  onNavigate(project: any) {
    this.router.navigate(['project-detail', project.ProjectID])
    // this.router.navigateByUrl('product-detail');
    window.scroll({ top: 0, behavior: 'smooth' })
  }
  onNavigateBlogs(type:number) {
    if(type ==1){
      this.router.navigateByUrl('achievements');
      window.scroll({ top: 0, behavior: 'smooth' })
    }else if(type ==2){
      this.router.navigateByUrl('blog');
      window.scroll({ top: 0, behavior: 'smooth' })
    }

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
  getBlogsList() {
    const body = {
      Skip: 0,
      Limit: 3
    };

    try {

      this.AppService.postMethod('Filter_All_Blogs', body)
        .subscribe(resp => {
          if (resp.success) {
            this.blogsData = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
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
  getWhyWorkwithus() {
    const body = {
    };

    try {

      this.AppService.postMethod('Fetch_Why_Work_Withus_Info', body)
        .subscribe(resp => {
          if (resp.success) {
            this.whyWorkWithUs = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
  getBannersList() {
    const body = {
    };

    try {

      this.AppService.postMethod('Fetch_Client_Testimonials', body)
        .subscribe(resp => {
          if (resp.success) {
            this.ClientTestimonialData = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
  getClientTestimonial() {
    const body = {
      Skip:0,
      Limit:10000,
      Whether_Banner_Type_Filter:false,
      Banner_Type:''
    };

    try {

      this.AppService.postMethod('Filter_All_Banners', body)
        .subscribe(resp => {
          if (resp.success) {
            this.BannersList = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
}

