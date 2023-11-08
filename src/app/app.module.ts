import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EleccionEquiposComponent } from './eleccion_carpeta/eleccion-equipos//eleccion-equipos.component';
import { PokeApiService } from './poke-api.service';
import {MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './eleccion_carpeta/dialog/dialog.component';
import { EleccionComponent } from './eleccion_carpeta/eleccion/eleccion.component';
import { EquiposComponent } from './eleccion_carpeta/equipos/equipos.component';
import { PeleaComponent } from './pelea_carpeta/pelea/pelea.component';
import { PokedexComponent } from './pokedex/pokedex.component'
import { Routes,RouterModule } from '@angular/router';
import { CampoDeBatallaComponent } from './pelea_carpeta/campo-de-batalla/campo-de-batalla.component';
import { EleccionesPeleaComponent } from './pelea_carpeta/elecciones-pelea/elecciones-pelea.component';

const appRoutes:Routes=[
  {path:'', component:EleccionComponent},
  {path:'pelea',component:PeleaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EleccionEquiposComponent,
    DialogComponent,
    EleccionComponent,
    EquiposComponent,
    PeleaComponent,
    PokedexComponent,
    CampoDeBatallaComponent,
    EleccionesPeleaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
