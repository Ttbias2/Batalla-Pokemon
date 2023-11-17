import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuariosDbService } from './usuarios-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private usuariosDBService:UsuariosDbService
  ) { }

  getAuthId():Observable<boolean>{
    if(-1 == this.usuariosDBService.obtenerId()){
      console.log("id = -1");
      return of(false);
    }else{
      console.log("id no es = a -1");
      return of(true);
    }
  }
}
