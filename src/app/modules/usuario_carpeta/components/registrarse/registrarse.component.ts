import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interface-usuario';
import { partida } from 'src/app/interfaces/interface-partida';
import { UsuariosDbService } from '../../../../services/usuarios-db.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  constructor(private formBuilder: FormBuilder,
    
    private usuarioDBService: UsuariosDbService,
    private router: Router,) {

  }

  formulario: FormGroup = this.formBuilder.group({
    apellido: ["", [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],

    nombre: ["", [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],

    password: ["", [Validators.required,Validators.minLength(4) /*Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,15}')*/]],

    email: ["", [Validators.email, Validators.required]],

    historial: "",

    id: 0

  })

  rutaInicioSesion() {
    this.router.navigate(["login"]);
  }

  partida:partida={
    jugador1:"",
    jugador2:"",
    vencedor:true,
    pokemons:[]
  }

  async guardarUsuario() {
    if (this.formulario.invalid) return;
    const usuario: usuario = {
      apellido: this.formulario.controls["apellido"].value,
      nombre: this.formulario.controls["nombre"].value,
      password: this.formulario.controls["password"].value,
      email: this.formulario.controls["email"].value,
      historial: [this.partida],
      id: this.formulario.controls["id"].value
    }

    if(true == await this.emailRepetido(usuario.email)){//si el email se repite
      alert("Ya existe una cuenta con ese Email");
      this.formulario.reset();
    }else{
      usuario.historial.length = 0;
      this.usuarioDBService.postUsuarioHttp(usuario)
      
      .subscribe(
        {
          next:(user) =>{
            
            alert(`Usuario: ${user.apellido} registrado con exito`);
            
            this.router.navigate(["login"]);
          },
          error: (err)=>{
            console.log(err);
          }
        }
      )
    }    
  }

  

  listadoUsuarios :usuario[] | undefined= [];

  async emailRepetido(email:string){
    var flag= false;
    var i=0;
    try {
      this.listadoUsuarios= await this.usuarioDBService.getUsuarios();
      if(this.listadoUsuarios!=undefined){
        while(i<this.listadoUsuarios.length){
          if(this.listadoUsuarios[i].email == email){//Si el email existe  
            flag= true;
          }
          i++;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return flag;
  }
 


}
