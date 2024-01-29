import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoDeBatallaComponent } from './components/campo-de-batalla/campo-de-batalla.component';
import { EleccionesPeleaComponent } from './components/elecciones-pelea/elecciones-pelea.component';
import { VictoriaComponent } from './components/victoria/victoria.component';
import { PeleaComponent } from './pages/pelea/pelea.component';
import { RouterModule } from '@angular/router';
import { PeleaRoutingModule } from './pelea-routing.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';



@NgModule(
  {
    declarations: [
        CampoDeBatallaComponent,
        EleccionesPeleaComponent,
        VictoriaComponent,
        PeleaComponent,
        TooltipComponent
    ],
    
    exports:[
       PeleaRoutingModule//exporto las rutas que renderizan los componentes
    ],
    
    imports: [
      CommonModule,
      RouterModule,
      PeleaRoutingModule
    ]
  }
)
export class PeleaModule { }