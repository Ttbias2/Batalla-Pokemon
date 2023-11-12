import { Component, OnInit } from '@angular/core';
import { habilidad } from 'src/app/Clases/habilidad.model';
import { jugador } from 'src/app/Clases/jugador.model';
import { pokemon } from 'src/app/Clases/pokemon.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-elecciones-pelea',
  templateUrl: './elecciones-pelea.component.html',
  styleUrls: ['./elecciones-pelea.component.css']
})

export class EleccionesPeleaComponent implements OnInit {

  //variables para jugadores
  j1: jugador;
  j2: jugador;
  pokemonPeleandoj1: number;
  pokemonPeleandoj2: number;
  turno: boolean = true;

  //variables para cambio
  pokePeleandoCambio:number;
  pokesParaCambio: pokemon[] = [];
  cambioPokemon: boolean = false;
  cambioForzado=false;

  //variables para objetos
  usoObjeto: boolean = false;

  vidaUsadaj1:boolean = false;
  vidaUsadaj2:boolean = false;
  vidaUsadaBtn:boolean;

  velocidadUsadaj1:boolean = false;
  velocidadUsadaj2:boolean = false;
  velcidadUsadaBtn:boolean;

  efectosUsadaj1:boolean = false;
  efectosUsadaj2:boolean = false;
  efectosUsadaBtn:boolean;

  ataqueUsadaj1:boolean = false;
  ataqueUsadaj2:boolean = false;
  ataqueUsadaBtn:boolean;

  //variable para ataque
  atacar:boolean = false;
  habilidadesMostrar:habilidad[];
  habilidadUsadaj1:number;
  habilidadUsadaj2:number;
  jugador1Ataco:boolean = false;
  jugador2Ataco:boolean=false;

  constructor(private datUsuario: UsuariosService) {
    this.j1 = datUsuario.jugador1;
    this.j2 = datUsuario.jugador2;
  }

  ngOnInit(): void {
    this.datUsuario.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datUsuario.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
  }
  
  //atacar
  seleccionAtaque(){
    this.cambioPokemon = false;
    this.usoObjeto = false;
    this.atacar = true;
    if(this.turno)
    {
      this.habilidadesMostrar = this.j1.pokemons[this.pokemonPeleandoj1].habilidades;
      this.jugador1Ataco = true;
    }
    else{
      this.habilidadesMostrar = this.j2.pokemons[this.pokemonPeleandoj2].habilidades;
      this.jugador2Ataco = true;
    }

  }

  cargarAtaque(i:number){
    if(this.turno)
    {
      this.habilidadUsadaj1 = i;
      this.turno = false
      this.atacar = false;
    }
    else{
      this.habilidadUsadaj2 = i;
      this.turno = true;
      this.atacar = false;
      this.finDeTurno();
    }
  }

  //cambios de pokemon
  cambiarPokemon() {
    this.atacar = false;
    this.usoObjeto = false;
    this.cambioPokemon = true;
    if(this.turno)
    {
      this.pokePeleandoCambio = this.pokemonPeleandoj1;
      this.pokesParaCambio = this.j1.pokemons;
    }
    else{
      this.pokePeleandoCambio = this.pokemonPeleandoj2;
      this.pokesParaCambio = this.j2.pokemons;
    } 
  }

  cambioj1(poke: number) {
    if(this.turno){
      this.datUsuario.cambiarPokej1(poke);
      this.turno = false;
    }
    else{
      this.datUsuario.cambiarPokej2(poke);
      this.turno = true;
      this.finDeTurno();
    }
    this.cambioPokemon = false;
    if(this.cambioForzado)
    {
      this.turno=true;
      this.cambioForzado = false;
    }
    
  }

  //uso de objetos
  usarObjeto() {
    this.cambioPokemon = false;
    this.atacar = false;
    this.usoObjeto = true;
    if(this.turno)
    {
      this.vidaUsadaBtn = this.vidaUsadaj1;
      this.velcidadUsadaBtn = this.velocidadUsadaj1;
      this.ataqueUsadaBtn = this.ataqueUsadaj1;
      this.efectosUsadaBtn  = this.efectosUsadaj1;
    }
    else
    {
      this.vidaUsadaBtn = this.vidaUsadaj2;
      this.velcidadUsadaBtn = this.velocidadUsadaj2;
      this.ataqueUsadaBtn = this.ataqueUsadaj2;
      this.efectosUsadaBtn  =this.efectosUsadaj2;
    }
  }

  usoPocionVida() {
    if (this.turno) {
      if(!this.vidaUsadaj1)
      {
        if ((this.j1.pokemons[this.pokemonPeleandoj1].vidaActual + 40) > this.j1.pokemons[this.pokemonPeleandoj1].vida) {
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual = this.j1.pokemons[this.pokemonPeleandoj1].vida;
        }
        else {
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual += 40;
        }
        this.turno = false;
        this.vidaUsadaj1 = true;
      }
    }
    else {
      if(!this.vidaUsadaj2)
      {
        if ((this.j2.pokemons[this.pokemonPeleandoj2].vidaActual + 40) > this.j2.pokemons[this.pokemonPeleandoj2].vida) {
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual = this.j2.pokemons[this.pokemonPeleandoj2].vida;
        }
        else {
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual += 40;
        }  
        this.vidaUsadaj2 = true;
        this.turno = true;
        this.finDeTurno();
      }
      
    }

    this.usoObjeto = false;
  }

  usoPocionVelocidad(){
    if(this.turno)
    {
       if(!this.velocidadUsadaj1)
       {
          this.j1.pokemons[this.pokemonPeleandoj1].velocidad += 20;
          this.velocidadUsadaj1 = true;
          this.turno = false;
       }
       
    }
    else{
      if(!this.velocidadUsadaj2)
      {
         this.j2.pokemons[this.pokemonPeleandoj2].velocidad += 20;
         this.velocidadUsadaj2 = true;
         this.turno = true;
         this.finDeTurno();
      }
    }

    this.usoObjeto = false;

  }

  usoQuitarEfecto(){
      if(this.turno){
        if(!this.efectosUsadaj1)
        {
          this.j1.pokemons[this.pokemonPeleandoj1].bajo_efecto = [];
          this.efectosUsadaj1 = true;
          this.turno = false;
        }
      }
      else{
        if(!this.efectosUsadaj2)
        {
          this.j1.pokemons[this.pokemonPeleandoj2].bajo_efecto = [];
          this.efectosUsadaj2 = true;
          this.turno = true;
          this.finDeTurno();
        }
      }

      this.usoObjeto = false;
  }

  usoPocionAtaque(){
    if(this.turno)
    {
       if(!this.ataqueUsadaj1)
       {
          this.j1.pokemons[this.pokemonPeleandoj1].ataque += 10;
          this.ataqueUsadaj1 = true;
          this.turno = false;
       }
       
    }
    else{
      if(!this.ataqueUsadaj2)
      {
         this.j2.pokemons[this.pokemonPeleandoj2].ataque += 10;
         this.ataqueUsadaj2 = true;
         this.turno = true;
         this.finDeTurno();
      }
    }

    this.usoObjeto = false;
  }

  finDeTurno(){
    
    const pokej1:pokemon = this.j1.pokemons[this.pokemonPeleandoj1];
    const pokej2:pokemon = this.j2.pokemons[this.pokemonPeleandoj2];

    if(pokej1.velocidad>pokej2.velocidad)
    {
      if(this.jugador1Ataco)
      {
        this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej1,pokej2,this.habilidadUsadaj1);
      }
      
      if(this.j2.pokemons[this.pokemonPeleandoj2].vidaActual>0)
      {
        if(this.jugador2Ataco)
        {
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej2,pokej1,this.habilidadUsadaj2);
        }
      }else{
        this.cambioForzado = true;
        this.turno=false;
        this.cambiarPokemon()
      }
      
    }
    else
    {
      if(this.jugador2Ataco)
      {
        this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej2,pokej1,this.habilidadUsadaj2);
      }
      
      if(this.j1.pokemons[this.pokemonPeleandoj1].vidaActual>0)
      {
        if(this.jugador1Ataco)
        {
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej1,pokej2,this.habilidadUsadaj1);
        }
      }
      else{
        this.cambioForzado=true;
        this.cambiarPokemon();
      }
      
    }

    this.jugador1Ataco = false;
    this.jugador2Ataco = false;
    
  }
  
  calcularDaño(poke1:pokemon,poke2:pokemon,habilidadusada:number):number
  {
    return Math.round(((poke1.ataque+poke1.habilidades[habilidadusada].power)-poke2.defensa)/4);
  }
}
