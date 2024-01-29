import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './components/historial/historial.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PageMenuComponent } from './pages/page-menu/page-menu.component';
import { RouterModule } from '@angular/router';
import { IngresarJugadoresComponent } from './components/ingresar-jugadores/ingresar-jugadores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';



@NgModule(
  {
    declarations: [
      HistorialComponent,
      NavBarComponent,
      PokedexComponent,
      PageMenuComponent,
      IngresarJugadoresComponent
    ],
    
    exports:[
      MenuRoutingModule //exporto las rutas que renderizan los componentes
    ],
    
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      MenuRoutingModule
    ]
  }
)
export class MenuModule { }
