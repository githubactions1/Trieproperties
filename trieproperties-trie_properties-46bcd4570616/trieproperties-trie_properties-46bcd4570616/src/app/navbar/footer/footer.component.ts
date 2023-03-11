import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router:Router
  ) { }


  ngOnInit() {
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

  }
}
