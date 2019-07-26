import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'http://dummy.restapiexample.com/api/v1'
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${this.apiUrl}/employees`)
  }
  get(request) {
    return this.http.get(`${this.apiUrl}/employee/${request.id}`)
  }
  save(request) {
    if (request.id) {
      return this.http.put(`${this.apiUrl}/update/${request.id}`, request)
    }
    return this.http.post(`${this.apiUrl}/create`, request)
  }
  delete(request) {
    return this.http.delete(`${this.apiUrl}/delete/${request.id}`)
  }
}
``