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
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  SaveFormData(flag: boolean) {
    if (flag) {
      if (this.data.isUpdateForm) {
        this.dashboardService.getRequest().subscribe((res: any) => {
          const getId = JSON.parse(JSON.stringify(res));
          res = res.map((id: any) => {
            delete res.formId;
            delete res.fileName;
            return res;
          });
          const formDataDetails = {
            formData: res,
            fileName: this.data.fileName,
          };
          this.dashboardService
            .putJsonDataInForm(getId[0].formId, formDataDetails)
            .subscribe(() => {
              this.dashboardService.getRequest().subscribe((response: any) => {
                Array.from(response).forEach((Id: any) => {
                  this.dashboardService.deleteitem(Id.id).subscribe(() => {});
                });
              });
          });
          this.router.navigate(['/forms'])

        });
      } else {
        this.dashboardService.getRequest().subscribe((products) => {
          const formDataDetails = {
            formData: products,
            fileName: this.data.fileName,
          };
          this.dashboardService.saveFormData(formDataDetails).subscribe(() => {
            this.dashboardService.getRequest().subscribe((response: any) => {
              Array.from(response).forEach((Id: any) => {
                this.dashboardService.deleteitem(Id.id).subscribe(() => {});
              });
            });
          });
          this.router.navigate(['/forms'])
        });
      }
    }
  }
}
