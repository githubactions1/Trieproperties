import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../app.service';
@Component({
  selector: 'app-contact-forms',
  templateUrl: './contact-forms.component.html',
  styleUrls: ['./contact-forms.component.css']
})
export class ContactFormsComponent implements OnInit {
  skip = 0;
  limit = this._appService.limit;
  currentPage = 1;
  TotalItems: any;
  isTableloading: boolean = false;
  tableData: any = []
  constructor(
    private nzMessageService: NzMessageService,
    public _appService: AppService
  ) { }

  ngOnInit() {
    this.getTableList()
  }
  getTableList() {
    const body = {
      Skip: this.skip,
      Limit: this.limit,
    }
    try {
      this.isTableloading = true;
      this._appService.postMethod_admin('Filter_All_Cotact_Forms', body)
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
}
