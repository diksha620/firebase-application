import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudapiService {

  constructor( private http : HttpClient) { }

  postData(data:any){
    return this.http.post('http://localhost:3000/formsData', data)
  }

  getData() {
    return this.http.get<any>('http://localhost:3000/formsData');
  }

  putData(id : number , data : any) {
    return this.http.put(`http://localhost:3000/formsData/${id}` , data)
  }

  deleteData(id:number){
    return this.http.delete(`http://localhost:3000/formsData/${id}`)
  }
}
