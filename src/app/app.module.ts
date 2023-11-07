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

@NgModule({
  declarations: [
    AppComponent,
    EleccionEquiposComponent,
    DialogComponent,
    EleccionComponent,
    EquiposComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
