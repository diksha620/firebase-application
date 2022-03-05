import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   endpoint = environment.ApiPoint

  constructor(private routes : Router , private http : HttpClient) 
  { }

  postRequest(dataget : any) {
    return this.http.post(`${this.endpoint}/controls` ,dataget)
  }

  putRequest(id :number , data: any) {
    return this.http.put(`${this.endpoint}/controls/${id}`,data)
  }

  getRequest() {
    return this.http.get(`${this.endpoint}/controls`);
  }

  deleteitem(id :any) {
    return this.http.delete(`${this.endpoint}/controls/${id}`)
  }

  saveFormData(data : any){
    return this.http.post(`${this.endpoint}/forms`,data)
  }
  
  getFormDataFromJson() {
    return this.http.get(`${this.endpoint}/forms`);
  }

  deleteitemFromArray(id : number){
    return this.http.delete(`${this.endpoint}/forms/${id}`)
  }
  
  getJsonDataFromForm(id : number){
     return this.http.get(`${this.endpoint}/forms/${id}`)
  }
  
  putJsonDataInForm(id :number , data: any ){
    return this.http.put(`${this.endpoint}/forms/${id}` , data)
  }
}
