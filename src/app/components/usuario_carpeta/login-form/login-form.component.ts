import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosDbService } from 'src/app/services/usuarios-db.service';
import { usuario } from 'src/app/interfaces/interface-usuario'; 

export interface user{
  email:string,
  password:string
}



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  constructor(
    private router: Router,
    private usuarioService:UsuariosDbService,
    private formBuilder: FormBuilder){

  }


  

  listadoUsuarios :usuario[] | undefined= [];

  

  formulario: FormGroup =this.formBuilder.group({
    email:["",[Validators.email, Validators.required]],
    password:["",[Validators.required]]
  })

  async iniciarSesion(){
    
    if(this.formulario.invalid)return;
    const usuario:user={
      email:this.formulario.controls["email"].value,
      password:this.formulario.controls["password"].value
    }
    if(true == await this.verificarUsuario(usuario)){
      alert("Logeo exitoso");
      this.router.navigate(["/page-menu"]);
    }else{
      alert("Email o Password incorrecto");
      this.formulario.reset();
    }
  }

  async verificarUsuario(usuario:user){
    var flag= false;
    var i=0;
    try {
      this.listadoUsuarios= await this.usuarioService.getUsuarios();

      if(this.listadoUsuarios!=undefined){
      
        while(i<this.listadoUsuarios.length){
          
          if(this.listadoUsuarios[i].email == usuario.email){//Si el email existe  
            flag= true;

            if(this.listadoUsuarios[i].password == usuario.password){//y si la contraseña es correcta
              return flag;
            }
            else{
              flag = false;
              return flag;
            }
          }
          
          i++;
       
        }
      }
    } catch (error) {
      console.log(error);
    }

    return flag;
  }


  rutaRegistrarse(){
    this.router.navigate(["/registrarse"]);
  }
}
