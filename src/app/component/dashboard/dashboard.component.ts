import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { CdkDragDrop,  moveItemInArray, } from '@angular/cdk/drag-drop';
// import JsonFormData from '../../../../my-form.json';
import { DashboardService } from './dashboard.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import PreviewFormComponent from './previewForm/previewForm.component';
import SaveFormComponent from './save-form/save-form.component';
import { FormTableComponent } from './form-table/form-table.component';
import { ActivatedRoute } from '@angular/router';

interface Controls {
  controls: Control[];
}

 interface Control {
  name: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  validators: Validators;
  fileName: string;
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
  elementid: any;
  filename: any;
  myForm = this.fb.group({});

  constructor(
    private auth: AuthService,
    public dashboardService: DashboardService,
    private fb: FormBuilder,
    public Dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

 

  ngOnInit() {
     this.route.queryParams.subscribe((id:any) => {
       if(id.id){
       this.dashboardService.getFormDataWithIdFromJson(id.id)
       .subscribe((response : any) =>{
         console.log(response)
         this.dashboardService.formsDataa = response.formData
         this.filename = response.fileName
         this.elementid = response.id
         console.log(this.elementid)
       });
      }
      else{
        this.dashboardService.formsDataa = [];
        this.filename = '';
      }
     })
    
  }

 

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
  done = [''];
  data : any;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      console.log('else is working');
      // copyArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);
      const dataget = this.getType(
        event.previousContainer.data[event.previousIndex]
      );
      if (this.dashboardService.formsDataa && this.dashboardService.formsDataa.length) {
        this.dashboardService.formsDataa.push({ ...dataget });
      } else {
        this.dashboardService.formsDataa = [{ ...dataget}];
      }
    }
  }



  showPreviewForm(data: any) {
    let dialogRef = this.Dialog.open(PreviewFormComponent, { data });
    dialogRef.afterClosed().subscribe((res: any) => {
     
    });
  }

  saveForm(fileName: any) {
    const isUpdateForm = this.filename ? true : false;
   
    let dialogRef = this.Dialog.open(SaveFormComponent, {
      data: {
        fileName,
        isUpdateForm,
        controls: this.dashboardService.formsDataa,
        formId: this.elementid,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
     
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
