import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { VictoriaComponent } from './components/victoria/victoria.component';
import { PeleaComponent } from './pages/pelea/pelea.component';

const routes: Routes = [
    {path:'pelea',component:PeleaComponent,canMatch:[authGuard]},
    {path:'victoria',component:VictoriaComponent,canMatch:[authGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PeleaRoutingModule { }