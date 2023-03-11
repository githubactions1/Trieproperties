import { Component,OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-Blogs',
  templateUrl: './Blogs.component.html',
  styleUrls: ['./Blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogsData: any = []
  constructor(private AppService: AppService,
  ) { }

  ngOnInit() {
    this.getBlogsList()
  }
  getBlogsList() {
    const body = {
      Skip:0,
      Limit:100000
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
}
