import { Component, OnInit } from '@angular/core';
import { UsuariosDbService } from '../../../services/usuarios-db.service';
import { usuario } from 'src/app/interfaces/interface-usuario';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit{

  constructor(private usuarioService:UsuariosDbService){
  }

  listadoUsuarios:usuario[] | undefined = [];//puede recibir el arreglo de usuarios o undefined si el try/catch lanza un error

  ngOnInit():void{
    this.mostrarClientesHttp();
  }

  mostrarClientesHttp(){
    this.usuarioService.getUsuariosHttp().subscribe(
      {
        next:(user)=>{
          this.listadoUsuarios = user;
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );
  }
  /*async mostrarClientes(){
    this.listadoClientes = await this.usuarioService.getClientes();//recibe el arreglo de usuarios o undefined
    console.log(this.listadoClientes);
  }*/

  
  
  eliminarUsuarioHttp(id:number){
    const ok = confirm(`Desea eliminar al usuario?`);
    if(ok){
      this.usuarioService.deleteUsuarioHttp(id).subscribe(
        {
          next:()=>{
            alert(`Eliminar cliente id:${id}`);
          },
          error:(err)=>{
            console.log(err);
          }
        }
      )
    }
  }
  /*eliminarCliente(id: number){
    const ok= confirm("Desea eliminar al usuario?");
    if(!ok)return;
    this.usuarioService.deleteUsuario(id);
  }*/
}
