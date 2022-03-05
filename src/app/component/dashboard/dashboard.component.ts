import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import JsonFormData from '../../../../my-form.json';
import { DashboardService } from './dashboard.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import PreviewFormComponent from './previewForm/previewForm.component';
import SaveFormComponent from './save-form/save-form.component';
import { FormTableComponent } from './form-table/form-table.component';
import { ActivatedRoute } from '@angular/router';




export interface Root {
  controls: Control[];
}

export interface Control {
  name: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  validators: Validators;
  fileName : string;
}

export interface Validators {
  required?: boolean;
  minLength?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: any = [];
  isUpdateForm = false;
  elementid : any
  constructor(
    private auth: AuthService,
    
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private Dialog : MatDialog,
    private route : ActivatedRoute,
    
    
  ) {}

  getDataFromJson() {
    this.dashboardService.getRequest().subscribe((response: any) => {
      this.products = response;
      this.createForm(this.products);
    });
  }
  ngOnInit() {
    
  this.getDataFromJson();
     
  }

  myForm = this.fb.group({});

  getType(type: String) {
    switch (type) {
      case 'input':
        return {
          type: 'text',
          name: 'name',
          value: '',
          label: 'Name',
          placeholder: 'Enter your name',
        };

      case 'password':
        return {
          type: 'password',
          name: 'password',
          value: '',
          label: 'password',
          placeholder: 'Enter your password',
        };

      case 'button':
        return {
          type: 'button',
          name: 'button',
          value: 'button',
        };

      case 'submit':
        return {
          type: 'submit',
          value: 'submit',
        };

      case 'textarea':
        return {
          name: 'textarea',
          type: 'textarea',
          value: '',
          placeholder: 'write your message',
          label: 'Remark',
        };
      case 'email':
        return {
          name: 'email',
          type: 'email',
          value: '',
          label: 'Email',
        };

      default:
        return {};
    }
  }

  todo = ['input', 'password', 'email', 'button', 'submit', 'textarea'];
  done = [];
  data! : Control[];
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      this.dashboardService.getRequest().subscribe((response: any) => {
        this.products = response;
        const previousData = this.products[event.previousIndex];
        const currentData = this.products[event.currentIndex];
        this.dashboardService
          .putRequest(previousData.id, currentData)
          .subscribe(() => {
            this.dashboardService
              .putRequest(currentData.id, previousData)
              .subscribe(() => {
                this.getDataFromJson();
              });
          });
      });
    } else {
      console.log('else is working');
      const dataget = this.getType(
        event.previousContainer.data[event.previousIndex]
      );
      this.dashboardService.postRequest(dataget).subscribe(() => {
        this.getDataFromJson();
      });
    }
  }

  createForm(products: any) {
    for (const product of products) {
      this.myForm.addControl(product.name, this.fb.control(''));
    }
  }
  
  showPreviewForm(data : any){
    let dialogRef = this.Dialog.open(PreviewFormComponent, { data });
    dialogRef.afterClosed().subscribe((res : any ) => {
      this.getDataFromJson();
    })

  }

  saveForm(fileName:any) {
   
     const isUpdateForm = this.products[0].fileName ? true : false
    //  console.log(this.products[0].fileName)
    let dialogRef = this.Dialog.open(SaveFormComponent , {
      data : {
        fileName , isUpdateForm
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {  
     this.getDataFromJson();
    });
    
  }
  

  // deleteRequest(id: number) {
  //   this.dashboardService.deleteitem(id).subscribe(() => {
  //     this.getDataFromJson();
  //   });
  // }
  
  logout() {
    this.auth.logout();
    localStorage.clear();
  }



}
