import { Component,OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-achievements-rewards',
  templateUrl: './achievements-rewards.component.html',
  styleUrls: ['./achievements-rewards.component.css']
})
export class AchievementsRewardsComponent implements OnInit {
  tableData: any = []

  constructor(private AppService: AppService) { }

  ngOnInit() {
    this.getTableList()

  }
  getTableList() {
    const body = {
      Skip:0,
      Limit:100000
    };

    try {

      this.AppService.postMethod('Filter_All_Achievements_and_Rewards', body)
        .subscribe(resp => {
          if (resp.success) {
            this.tableData = resp.extras.Data
          } else {
          }
        },
          error => {

          });
    } catch (e) { }
  }
}
