import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/herokulogin/auth-service-for-heroku.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
 
  constructor(private authService : AuthService, private routes : Router) { }
   
  ngOnInit(): void {
  }
 

  signInForm = new FormGroup({
    email: new FormControl('' , [Validators.required,Validators.email]),
    password: new FormControl('' , [Validators.required]), 
  })

  signInUser(){
    console.log("Insignuser")
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      this.authService.signIn(this.signInForm.value).subscribe((response) => {
        console.log(response);
        this.routes.navigate(['dashboard'])
      })
      localStorage.setItem('form-data',JSON.stringify(this.signInForm.value))
    }
  }

  get email(){
    return this.signInForm.get('email')
  }

  get password(){
    return this.signInForm.get('password')
  }

 
}
