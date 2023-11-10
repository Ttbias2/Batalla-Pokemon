import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { PokeApiService } from '../../../services/poke-api.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  numPoke:number=0;
  pokemon:any;

  constructor(private datUsuario:UsuariosService,private datPoke:PokeApiService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogComponent>){
    this.numPoke = data;
  }

  buscarPokemon(){
    this.datPoke.traerUnPokemon(this.numPoke).subscribe(dat => this.mostrarPoke(dat));
  }

  mostrarPoke(poke:any)
  {
    this.pokemon=poke;
  }

  aceptar(){
    this.datUsuario.asignarPokemon(this.pokemon);
    this.dialogRef.close();
  }
}
