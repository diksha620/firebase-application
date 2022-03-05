import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudApplicationComponent } from './component/crud-application/crud-application.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormTableComponent } from './component/dashboard/form-table/form-table.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProtectedGuard } from './shared/guard/protected.guard';

const routes: Routes = [
{path: '' , redirectTo:'signup', pathMatch: 'full'},
{path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
{path:'signup' , component: SignupComponent, canActivate:[ProtectedGuard]},
{path:'signin' , component:SignInComponent, canActivate:[ProtectedGuard]},
{
  path: 'forms',
  component: FormTableComponent,
  canActivate: [AuthGuard],
},
{path:'crud' , component:CrudApplicationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }