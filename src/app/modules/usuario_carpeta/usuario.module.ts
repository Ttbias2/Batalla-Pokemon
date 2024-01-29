import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresarJugadoresComponent } from '../menu/components/ingresar-jugadores/ingresar-jugadores.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeInicialComponent } from './components/home-inicial/home-inicial.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule(
  {
    declarations: [
      ListarUsuariosComponent,
      LoginFormComponent,
      EditarUsuarioComponent,
      RegistrarseComponent,
      HomeInicialComponent
    ],

    exports:[
      UsuarioRoutingModule
    ],

    imports: [
      CommonModule,
      UsuarioRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule
    ]
  }
)

export class UsuarioModule { }
