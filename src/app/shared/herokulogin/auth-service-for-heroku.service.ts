import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private routes : Router , private http : HttpClient) { }

  signIn(model:any){
    const payload = model;
    return this.http.post('https://pointwork.herokuapp.com/users/auth/login', {payload})    
  }

  signUp(model:any){
    const payload = model;
    return this.http.post('https://pointwork.herokuapp.com/users/signup', {payload})
  }

  
}
