import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInicialComponent } from './components/home-inicial/home-inicial.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';

const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home',component:HomeInicialComponent},
    {path:'login',component:LoginFormComponent},
    {path:'registrarse',component:RegistrarseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
