import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import JsonFormData from '../../../../my-form.json';
import { HttpClient } from '@angular/common/http';

export interface Root {
  controls: Control[]
}

export interface Control {
  name: string
  label: string
  value: string
  type: string
  placeholder: string
  validators: Validators
}

export interface Validators {
  required?: boolean
  minLength?: number
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  products: any = JsonFormData;

 constructor(private auth : AuthService , private http : HttpClient) { }
  ngOnInit(){
  }

  getType(){
    
  }

  todo = ['Innput', 'Button', 'Go home', 'Fall asleep'];
  done = []
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("else is working")
      
      this.http.post("http://localhost:3000/controls" , {}) .subscribe(data =>{
        console.log(data);
        this.products = data;
      })

    
    }
  }

  logout() {
    this.auth.logout();
    localStorage.clear()
  }
}
