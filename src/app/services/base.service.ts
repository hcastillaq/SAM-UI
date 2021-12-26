import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http$: HttpClient) {}

  get(url, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.get(`${url}`, { params });
  }

  post(url, data): Observable<any> {
    return this.http$.post(`${url}`, data);
  }
  update(url, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.put(`${url}`, { params });
  }
  delete(url, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.request('DELETE', `${url}`, {
      body: params,
    });
  }
  put(url, data): Observable<any> {
    return this.http$.put(url, data);
  }
}
