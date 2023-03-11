import { HttpClient, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  limit = 10;

  ApikeyEmitter = new EventEmitter(false)

  constructor(
    private httpService: HttpClient,
    private _CookieService: CookieService
  ) { }
  public readonly Url = `https://api.trieproperties.com/app/`;

  postMethod(posturl: string, body: any): Observable<any> {
    body.ApiKey = ""
    if (this._CookieService.check('triePropertiesApiKey')) {
      body.ApiKey = JSON.parse(this._CookieService.get('triePropertiesApiKey')).ApiKey
    }
    return this.httpService.post(this.Url + posturl, body)
  }
}
