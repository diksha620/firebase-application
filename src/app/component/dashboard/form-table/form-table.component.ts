import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

import { MatDialog } from '@angular/material/dialog';
import PreviewFormComponent from '../previewForm/previewForm.component';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  fileName: string;
  id: number;
  formData: any;
  actions: any;
}

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css'],
})
export class FormTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fileName', 'actions'];
  dataSource: any;

  constructor(
    private dashboardService: DashboardService,
    private Dialog: MatDialog,
    private router :Router
  ) {}

  ngOnInit() {
    this.dashboardService.getFormDataFromJson().subscribe((products) => {
      this.dataSource = products;
    });
  }

  showPreviewFormIntable(data: any) {
    let dialogRef = this.Dialog.open(PreviewFormComponent, { data });
    dialogRef.afterClosed().subscribe((res: any) => {});
  }

  updateForm(element : any){
    this.router.navigate(['/dashboard'] , {queryParams : {id : element.id}})
    

  }
  

  DeleteItemIntable(id: number) {
    const data = {
      id,
    };
    let dialogRef = this.Dialog.open(DeleteFormComponent, { data });
    dialogRef.afterClosed().subscribe((res) => {
      this.dashboardService.getFormDataFromJson().subscribe((products) => {
        this.dataSource = products;
      });
    });
  }
}


