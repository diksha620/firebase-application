import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from  '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import PreviewFormComponent from './component/dashboard/previewForm/previewForm.component';
import SaveFormComponent from './component/dashboard/save-form/save-form.component';
import { FormTableComponent } from './component/dashboard/form-table/form-table.component';
import {MatTableModule} from '@angular/material/table';
import {DeleteFormComponent}  from './component/dashboard/delete-form/delete-form.component';
import { CrudApplicationComponent } from './component/crud-application/crud-application.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StudentFormComponent } from './component/student-form/student-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SignupComponent,
    SignInComponent,
    PreviewFormComponent,
    SaveFormComponent,
    FormTableComponent,
    DeleteFormComponent,
    CrudApplicationComponent,
    StudentFormComponent
  

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
     MatSortModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
