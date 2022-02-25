import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProtectedGuard } from './shared/guard/protected.guard';

const routes: Routes = [
{path: '' , redirectTo:'login', pathMatch: 'full'},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
{path:'signup' , component: SignupComponent, canActivate:[ProtectedGuard]},
{path:'signin' , component:SignInComponent, canActivate:[ProtectedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
