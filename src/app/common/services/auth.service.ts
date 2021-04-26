import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private requestUrl: string;

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    this.requestUrl = `${environment.baseUrl}/auth/login`;
    return this.http.post(this.requestUrl, data);
  }

  register(data): Observable<any> {
    this.requestUrl = `${environment.baseUrl}/auth/register`;
    return this.http.post(this.requestUrl, data);
  }

}
