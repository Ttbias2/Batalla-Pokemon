import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleccionComponent } from './pages/eleccion/eleccion.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    {path:"eleccion",component:EleccionComponent,canMatch:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleccionRoutingModule { }
