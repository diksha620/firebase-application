import { Component, Inject, OnInit } from '@angular/core';

import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css'],
})

export class DeleteFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteFormComponent>,

    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deleteForm(flag: boolean) {
    if (flag) {
        this.dashboardService
          .deleteitemFromArray(this.data.id)
          .subscribe(() => {});
    }
  }
}
