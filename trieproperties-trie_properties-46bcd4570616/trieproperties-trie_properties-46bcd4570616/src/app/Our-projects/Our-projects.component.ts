import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-Our-projects',
  templateUrl: './Our-projects.component.html',
  styleUrls: ['./Our-projects.component.css']
})
export class OurProjectsComponent implements OnInit {
  selectedTab: any = '';
  projectsData:any = []
  constructor(private AppService: AppService,private router:Router) { }

  ngOnInit() {
    this.tabChange(1)
  }

  tabChange(tab: any) {
    this.selectedTab = tab;
    this.getProjectsList()
  }
  getProjectsList() {
    const body = {
      Skip: 0,
      Limit: 100000,
      Whether_Project_Type_Filter: true,
      Project_Type: this.selectedTab
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
  onNavigate(project:any) {
    this.router.navigate(['project-detail',project.ProjectID])
    // this.router.navigateByUrl('product-detail');
    window.scroll({ top: 0, behavior: 'smooth' })
  }
}

