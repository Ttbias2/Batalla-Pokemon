import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { PokeApiService } from './services/poke-api.service';
import {MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

import { UsuarioModule} from './modules/usuario_carpeta/usuario.module';
import { MenuModule } from './modules/menu/menu.module';
import { EleccionModule } from './modules/eleccion/eleccion.module';
import { HomeInicialComponent } from './modules/usuario_carpeta/components/home-inicial/home-inicial.component';
import { LoginFormComponent } from './modules/usuario_carpeta/components/login-form/login-form.component';
import { RegistrarseComponent } from './modules/usuario_carpeta/components/registrarse/registrarse.component';
import { PeleaModule } from './modules/pelea/pelea.module';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [

  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeInicialComponent},
  {path:'login',component:LoginFormComponent},
  {path:'registrarse',component:RegistrarseComponent },

  {path:'nav-bar', loadChildren: ()=>import('./modules/menu/menu.module')
    .then( modulo => modulo.MenuModule)},//Lazy load promesa que importa el modulo cuando se necesita

  {path:"eleccion", loadChildren: ()=>import('./modules/eleccion/eleccion.module')
    .then( m => m.EleccionModule)},

  {path:'pelea',loadChildren: ()=>import('./modules/pelea/pelea.module')
    .then(modulo => modulo.PeleaModule)}

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatTooltipModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,

    //MODULOS QUE SE CARGAN EN LAZY LOAD
    UsuarioModule,
    MenuModule,
    EleccionModule,
    PeleaModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
