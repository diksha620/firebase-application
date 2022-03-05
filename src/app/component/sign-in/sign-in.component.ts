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
  emailInvalid = false;
  passwordInvalid = false;
   
  constructor(private authService : AuthService, private routes : Router) { }
   
  ngOnInit(){
    this.isEmailInvalid();
    this.isPasswordInvalid();
  }
 

  signInForm = new FormGroup({
    email: new FormControl('' , [Validators.required,Validators.email]),
    password: new FormControl('' , [Validators.required]), 
  })

  isEmailInvalid(){
    this.signInForm.get('email')?.valueChanges.subscribe((val) => {
       this.emailInvalid = false;
    });
 }
  isPasswordInvalid(){
    this.signInForm.get('password')?.valueChanges.subscribe((val) => {
      this.passwordInvalid = false
    })
  }



  error(err:any){
   
    if(err.error.includes('Invalid email id')){
      this.emailInvalid = true;
    }
    else if(err.error.includes('Invalid Password')){
      this.passwordInvalid = true;
    }

  }


  signInUser(){
    console.log("Insignuser")
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      this.authService.signIn(this.signInForm.value).subscribe((response) => {
        console.log(response);
        this.routes.navigate(['dashboard'])
      },
      (err) => this.error(err)
      )
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
