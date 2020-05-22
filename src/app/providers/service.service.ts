import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  path: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  loginClient(body) {
    return this.http.post(this.path + '/login', body);
  }
  profileClient(body) {
    return this.http.post(this.path + '/profile', body);
  }
  updateProfile(body) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.put(this.path + '/editProfile', body, httpOptions)
  }
}
