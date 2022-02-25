import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/herokulogin/auth-service-for-heroku.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  passwordnotmatch = false;
  emailnotregistered = false;

  signupForm = new FormGroup({
    firstname : new FormControl('' , [Validators.required]),
    lastname : new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required,Validators.email]),
    password: new FormControl('' , [Validators.required]),
    cpassword: new FormControl('' , [Validators.required]),
  },
  )

  isPasswordMatch(){
    this.signupForm.get('cpassword')?.valueChanges.subscribe((val) => {
      if(val !== this.cpassword?.value){
        this.passwordnotmatch = true;
      }
      else{
        this.passwordnotmatch = false;
      }
    });
  }
  isEmailRegistered(){
    this.signupForm.get('email')?.valueChanges.subscribe((val) => {
       this.emailnotregistered = false;
    });
  }

  error(err:any){
    console.log(err.error.includes('Email id already Registered'))
    if(err.error.includes('Email id already registered')){
      this.emailnotregistered = true;
    }
  }

  signupUser(){
    console.log("Insignuser",this.signupForm.value)
    if(this.signupForm.valid){
      if(this.password?.value === this.cpassword?.value){ 
      console.log(this.signupForm.value);
      this.passwordnotmatch = false;
      this.authservice.signUp(this.signupForm.value).subscribe(
        (response) => {
        console.log(response);
        this.routes.navigate(['signin']);
      },
        (err) => this.error(err)
      );
    }
    else{
      this.passwordnotmatch = true;
    }
  }
}


  get firstname(){
    return this.signupForm.get('firstname')
  }

  get lastname(){
    return this.signupForm.get('lastname')
  }

  get email(){
    return this.signupForm.get('email')
  }

  get password(){
    return this.signupForm.get('password')
  }

  get cpassword(){
    return this.signupForm.get('cpassword')
  }

  constructor(private authservice : AuthService, private routes : Router) { }

  ngOnInit(): void {
    this.isPasswordMatch()
    this.isEmailRegistered()
  }

}
