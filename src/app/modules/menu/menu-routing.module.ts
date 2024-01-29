import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageMenuComponent } from './pages/page-menu/page-menu.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { IngresarJugadoresComponent } from './components/ingresar-jugadores/ingresar-jugadores.component';
import { HistorialComponent } from './components/historial/historial.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    {path:'nav-bar',component:NavBarComponent,canMatch:[authGuard]},
    {path:'page-menu',component:PageMenuComponent,canMatch:[authGuard],
        children:[
            {path:'pokedex',component:PokedexComponent,canMatch:[authGuard]},
            {path:'ingresar-jugadores',component:IngresarJugadoresComponent,canMatch:[authGuard]},
            {path:'historial',component:HistorialComponent,canMatch:[authGuard]}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
