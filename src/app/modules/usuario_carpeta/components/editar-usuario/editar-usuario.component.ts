import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UsuariosDbService } from '../../../../services/usuarios-db.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  constructor(private usuariodb:UsuariosDbService,
    private sesionActiva:LoginFormComponent){

  }

  ngOnInit(): void {
    
    console.log(this.sesionActiva); 
    /*this.usuariodb.getUsuarioHttpId(sesion.id).subscribe(
        {
          next:(user)=>{
            console.log(user);
          },error:(err)=>{
            console.log(err);
          }
        }
      )*/
  }
  
  agregarPartida(){
    
  }
  

}
