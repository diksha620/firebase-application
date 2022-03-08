import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
})
export default class SaveFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SaveFormComponent>,
    private dashboardService: DashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  SaveFormData(flag: boolean) {
    if (flag) {
      if (this.data.isUpdateForm) {
        this.dashboardService
          .putJsonDataInForm(this.data.formId, {
            formData: this.data.controls,
            fileName: this.data.fileName,
          })
          .subscribe(() => {
            this.router.navigate(['/forms']);
          });
        
      } else {
       
          const formDataDetails = {
            formData: this.data.controls,
            fileName: this.data.fileName,
          };
          
        this.dashboardService.saveFormData(formDataDetails).subscribe(() =>{
          this.router.navigate(['/forms']);
        })
          
    
      }
    }
  }
}
