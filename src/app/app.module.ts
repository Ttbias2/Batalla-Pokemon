import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EleccionEquiposComponent } from './eleccion-equipos/eleccion-equipos.component';
import { PokeApiService } from './poke-api.service';
import {MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { EleccionComponent } from './eleccion/eleccion.component';
import { EquiposComponent } from './equipos/equipos.component';
import { PeleaComponent } from './pelea/pelea.component';
import { Routes,RouterModule } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';

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
    PokedexComponent
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
