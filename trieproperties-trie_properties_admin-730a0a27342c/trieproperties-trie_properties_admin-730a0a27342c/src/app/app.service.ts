import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  limit = 10;
  //   Upload_Url = environment.Upload_Url;
  Upload_Url = `https://mfo7l7c4yg.execute-api.ap-south-1.amazonaws.com/dev/upload/`;

  constructor(
    private httpService: HttpClient,
    private _CookieService: CookieService
  ) {}
  public readonly admin_Url = `https://mfo7l7c4yg.execute-api.ap-south-1.amazonaws.com/dev/admin/`;
  public readonly ImageUrl = `https://mfo7l7c4yg.execute-api.ap-south-1.amazonaws.com/dev/upload/`;
  //   public readonly admin_Url = environment.baseUrl;
  //   public readonly ImageUrl = environment.Upload_Url;

  postMethod_admin(posturl: string, body: any): Observable<any> {
    if (this._CookieService.check('trieadminData')) {
      let data = JSON.parse(this._CookieService.get('trieadminData'));
      (body.AdminID = data.AdminID), (body.SessionID = data.SessionID);
    }
    return this.httpService.post(this.admin_Url + posturl, body);
  }
  postMethodImage(posturl: string, body: any): any {
    return this.httpService.post(this.ImageUrl + posturl, body);
  }

  onUploadFile(req: HttpRequest<any>): Observable<any> {
    return this.httpService.request(req);
  }
}
