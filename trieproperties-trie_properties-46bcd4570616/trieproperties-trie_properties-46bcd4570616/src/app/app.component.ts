import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trie_Properties';
  constructor(
    private AppService: AppService,
    private cookieService: CookieService
  ) {
    if (this.cookieService.check('DeviceID')) {

      if (this.cookieService.check('triePropertiesApiKey')) {

      } else {
        this.getDeviceIdData()
      }
    } else {
      this.getSplashScreen()
    }
  }
  ngOnInit() {
  }
  getSplashScreen() {
    this.AppService.postMethod('Generate_DeviceID', {}).subscribe((data: any) => {
      if (data.success) {
        this.cookieService.set('DeviceID', data.extras.Data.DeviceID)
        this.getDeviceIdData()
      }
      // this.cookieService.set('DeviceID',data.)
    })

  }
  getDeviceIdData() {
    this.AppService.postMethod('Splash_Screen', {
      "DeviceID": this.cookieService.get('DeviceID'),
      "DeviceType": 3,
      "DeviceName": "One WEB",
      "AppVersion": 2

    }).subscribe((data: any) => {
      if (data.success) {
        this.cookieService.set('triePropertiesApiKey', JSON.stringify(data.extras))
        this.AppService.ApikeyEmitter.emit(true)
      }
      // this.cookieService.set('DeviceID',data.)
    })

  }
}
