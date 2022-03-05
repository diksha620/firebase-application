import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-previewForm',
  templateUrl: './previewForm.component.html',
  styles: [],
})

export default class PreviewFormComponent implements OnInit {
  formData: any;
  previewForms = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PreviewFormComponent>,
    private dashboard: DashboardService,
   
    @Inject(MAT_DIALOG_DATA) public products: any
  ) {}

  ngOnInit() {
    this.createPreviewForm(this.products);
  }
  createPreviewForm(datas: any) {
    for (const data of datas) {
      this.previewForms.addControl(data.name, this.fb.control(''));
    }
  }

  previewSubmit() {}
}