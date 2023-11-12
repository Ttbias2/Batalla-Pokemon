import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

import { usuario } from 'src/app/interfaces/interface-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDbService {

  url: string="http://localhost:4200/usuarios";
  listado: usuario[]|undefined=[];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.listado=[];
  }



  getUsuarioHttpId(id:number):Observable<usuario>{
    return this.http.get<usuario>(`${this.url}/${id}`);
  }
  putUsuarioHttp(usuario:usuario):Observable<usuario>{//Guardar nuevo historial
    return this.http.put<usuario>(
      `${this.url}/${usuario.id}`,
      usuario,
      {headers:{"Content-type": "application/json"}}
    )
  }

  getUsuariosHttp():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url)
      .pipe(//Captura los datos y los puede modificar de varias maneras utilizando map o filter
        
        catchError((error: any)=>{
          console.error("Ha ocurrido un error en la solicitud Http:",error);
          return throwError(()=>error);
        })
      )
  }


  async getUsuarios(): Promise <usuario[] | undefined> {//segun el try/catch puede devolver undefined o el arreglo de usuarios
    try {
      const resultado= await fetch(
        this.url,{
          method:"GET"
        }
      );
      const datos= resultado.json();
      return datos;//devuelve un arreglo de usuarios

    } catch (error) {
      console.log(error);
    }
    return undefined;//devuelve undefined si hay un error
  }


  async postUsuario(usuario:usuario){
    try {
      
      await fetch(
        this.url,{
          method:'POST',
          body: JSON.stringify(usuario),
          headers: {'Content-type': 'application/json'}
        }
      );
      
    } catch (error) {
      console.log(error);
    }
  }

  postUsuarioHttp(usuario:usuario): Observable<usuario>{
    return this.http.post<usuario>(
      this.url,
      usuario,
      {headers:{"Content-type":"application/json"}}
    );
  }

  /*async deleteUsuario(id: number){
    try {
      await fetch(`${this.url}/${id}`,
        {method:"DELETE"}
        );
      window.location.href="index.html";

    } catch (error) {
      console.log(error);
    }
  }*/

  deleteUsuarioHttp(id:number | undefined){
    return this.http.delete(`${this.url}/${id}`);
  }

}
 