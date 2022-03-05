import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog , } from '@angular/material/dialog';
import { CrudapiService } from 'src/app/services/crudapi.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crud-application',
  templateUrl: './crud-application.component.html',
  styleUrls: ['./crud-application.component.css']
})
export class CrudApplicationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'city', 'places', 'Remarks', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog , private crudapi : CrudapiService) { }


  ngOnInit(): void {
    this.getformData()
  }
  openForm(){
  let dialogRef = this.dialog.open(StudentFormComponent, {
    height: 'auto',
    width: '30%',
  }).afterClosed().subscribe(val => {
    if(val === 'save'){
      this.getformData();
    }
  })

}
  getformData(){
    this.crudapi.getData().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editData(row :any){
    this.dialog.open(StudentFormComponent, {
      height: 'auto',
      width: '30%',
      data:row,
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getformData()
      }
    });

  }
  deleteData(id :number){
    this.crudapi.deleteData(id).subscribe((res) => {
      this.getformData()
    })
  }
}



