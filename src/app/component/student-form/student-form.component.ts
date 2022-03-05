import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudapiService } from 'src/app/services/crudapi.service';
import  {MatDialogRef} from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
   places = ['jaipur' , 'udaipur' , 'agra' , 'alwar']
   StudentForm !: FormGroup
   button : string = "save"
    
  constructor(private fb : FormBuilder , private crudApi : CrudapiService , private dialogRef : MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData :any
    ) { }

  ngOnInit(): void {
    this.StudentForm! = this.fb.group({
      name : new FormControl('' , [Validators.required]),
      email : new FormControl('' , [Validators.required,Validators.email]),
      city : new FormControl('' , [Validators.required]),
      places : new FormControl('' , [Validators.required]),
      Remarks : new FormControl('' , [Validators.required])
    });

    if(this.editData){
      this.button = "update"
      this.StudentForm.controls['name'].setValue(this.editData.name);
      this.StudentForm.controls['email'].setValue(this.editData.email);
      this.StudentForm.controls['city'].setValue(this.editData.city);
      this.StudentForm.controls['places'].setValue(this.editData.places);
      this.StudentForm.controls['Remarks'].setValue(this.editData.Remarks);
    }

  }
  
  addFormData(){
    if(!this.editData){
      if(this.StudentForm.valid){
        this.crudApi.postData(this.StudentForm.value).subscribe((response) => {
          this.StudentForm.reset();
          this.dialogRef.close('save');
        })
      }
    }
    else{
      this.updateForm();
    }
    
  }
  updateForm(){
    this.crudApi.putData(this.editData.id, this.StudentForm.value).subscribe((res)=> {
      this.StudentForm.reset();
      this.dialogRef.close('update')
    })

  }

}
