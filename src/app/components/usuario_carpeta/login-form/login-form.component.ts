import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosDbService } from 'src/app/services/usuarios-db.service';
import { usuario } from 'src/app/interfaces/interface-usuario'; 
import { partida } from 'src/app/interfaces/interface-partida';

export interface user{
  email:string,
  password:string
}



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit{

  constructor(
    private router: Router,
    private usuarioDBService:UsuariosDbService,
    private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    //this.usuarioService.idSesion.subscribe();
  }

  listadoUsuarios :usuario[] | undefined= [];

   sesionActiva:usuario={
    apellido:"",
    nombre:"",
    password: "",
    email: "",
    historial: [{
      jugador1:"",
      jugador2:"",
      vencedor:true,
      pokemons:[]
    }],
    id:0
  }

  usuarioVacio:usuario={
    apellido:"",
    nombre:"",
    password: "",
    email: "",
    historial: [{
      jugador1:"",
      jugador2:"",
      vencedor:true,
      pokemons:[]
    }],
    id:0
  }

  getSesion(){
    return this.sesionActiva;
  }
  cargarSesion(user:usuario){
    this.sesionActiva.nombre=user.nombre,
    this.sesionActiva.apellido=user.apellido,
    this.sesionActiva.email=user.email,
    this.sesionActiva.password=user.password,
    this.sesionActiva.historial=user.historial,
    this.sesionActiva.id=user.id
  }
  
  formulario: FormGroup =this.formBuilder.group({
    email:["",[Validators.email, Validators.required]],
    password:["",[Validators.required]]
  })

  partida:partida={
    jugador1:"damian",
    jugador2:"juancito",
    vencedor:false,
    pokemons:[1,2,3,4,5,6]
  }

  async iniciarSesion(){
    
    if(this.formulario.invalid)return;
    const usuario:user={
      email:this.formulario.controls["email"].value,
      password:this.formulario.controls["password"].value
    }
    
    this.cargarSesion( await this.verificarUsuario(usuario));//Devuelve un usuario registrado o vacio si no lo encuentra
    
    if(this.sesionActiva.email!= ""){
      alert("Logeo exitoso");
      localStorage.setItem('id',this.sesionActiva.id.toString());//setea el id en el localStorage
      this.usuarioDBService.setearId(this.sesionActiva.id);//setea el id para poder consultarlo al momento de guardar una partida o consultar historial
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
      this.listadoUsuarios= await this.usuarioDBService.getUsuarios();

      if(this.listadoUsuarios!=undefined){
      
        while(i<this.listadoUsuarios.length){
          
          if(this.listadoUsuarios[i].email == usuario.email){//Si el email existe  
            

            if(this.listadoUsuarios[i].password == usuario.password){//y si la contraseña es correcta
              return this.listadoUsuarios[i];
            }
            else{
              
              return this.usuarioVacio;
            }
          }
          
          i++;
       
        }
      }
    } catch (error) {
      console.log(error);
    }

    return this.usuarioVacio;
  }

  rutaRegistrarse(){
    this.router.navigate(["/registrarse"]);
  }
}
