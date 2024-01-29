import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { EleccionEquiposComponent } from './components/eleccion-equipos/eleccion-equipos.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EleccionComponent } from './pages/eleccion/eleccion.component';
import { EleccionRoutingModule } from './eleccion-routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UsuarioModule } from '../usuario_carpeta/usuario.module';

@NgModule(
    {
      declarations: [
        DialogComponent,
        EleccionEquiposComponent,
        EquiposComponent,
        EleccionComponent
      ],
      
      exports:[
        EleccionRoutingModule //exporto las rutas que renderizan los componentes
      ],
      
      imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        UsuarioModule,
        EleccionRoutingModule
      ]
    }
  )
  export class EleccionModule { }