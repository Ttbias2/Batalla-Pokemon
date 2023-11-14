import { Injectable } from '@angular/core';
import { usuario } from '../interfaces/interface-usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string="http://localhost:4200/usuarios";
  private user?:usuario;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  
  getUsuarios():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url);
  }

  verificarUsuarioyConstraseña(email:string, pass:string){

    this.getUsuarios().subscribe(users=>{

      users.find(u=>{

        if(u.password === pass && u.email === email){
          this.user= u;
          localStorage.setItem('token',u.id.toString());
          this.router.navigate(["/page-menu"]);
        }

      });
      
    });
  }

  get currentUser():usuario | undefined{
    if(!this.user)return undefined
    //structuredClone(this.user); clona el objeto usuario y lo retorna
    //al user ser private debemos pasar una copia para no modificarlo
    //si el dato es muy grande se debe clonar con structuredClone
    return{...this.user};//los ... es operador de clonado o propagacion
  }
}
