import { Component, OnInit } from '@angular/core';
import { habilidad } from 'src/app/Clases/habilidad.model';
import { jugador } from 'src/app/Clases/jugador.model';
import { pokemon } from 'src/app/Clases/pokemon.model';
import { TypesService } from 'src/app/services/types.service';
import { UsuariosDbService } from 'src/app/services/usuarios-db.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { partida } from 'src/app/interfaces/interface-partida';

@Component({
  selector: 'app-elecciones-pelea',
  templateUrl: './elecciones-pelea.component.html',
  styleUrls: ['./elecciones-pelea.component.css']
})

export class EleccionesPeleaComponent implements OnInit {

  showBarraExtra = true; //poner en false cuando funque

  toggleBarraExtra() //Para esconder barra del css
  {
      //this.showBarraExtra = !this.showBarraExtra; //corregir luego
      console.log("toggleBarraExtra");
      
  }

  //variables para jugadores
  j1: jugador;
  j2: jugador;
  pokemonPeleandoj1: number;
  pokemonPeleandoj2: number;
  turno: boolean = true;

  //variables para cambio
  pokePeleandoCambio: number;
  pokesParaCambio: pokemon[] = [];
  cambioPokemon: boolean = false;
  cambioForzado = false;

  //variables para objetos
  usoObjeto: boolean = false;

  vidaUsadaj1: boolean = false;
  vidaUsadaj2: boolean = false;
  vidaUsadaBtn: boolean;

  velocidadUsadaj1: boolean = false;
  velocidadUsadaj2: boolean = false;
  velcidadUsadaBtn: boolean;

  efectosUsadaj1: boolean = false;
  efectosUsadaj2: boolean = false;
  efectosUsadaBtn: boolean;

  ataqueUsadaj1: boolean = false;
  ataqueUsadaj2: boolean = false;
  ataqueUsadaBtn: boolean;

  //variable para ataque
  atacar: boolean = false;
  habilidadesMostrar: habilidad[];
  habilidadUsadaj1: number;
  habilidadUsadaj2: number;
  jugador1Ataco: boolean = false;
  jugador2Ataco: boolean = false;
  quitarEfecto: number = 3;


  constructor(private datUsuario: UsuariosService, private tablatipos: TypesService, private database:UsuariosDbService) {
    this.j1 = datUsuario.jugador1;
    this.j2 = datUsuario.jugador2;
  }

  ngOnInit(): void {
    this.datUsuario.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datUsuario.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
  }

  //atacar
  seleccionAtaque() {
    this.cambioPokemon = false;
    this.usoObjeto = false;
    this.atacar = true;
    if (this.turno) {
      this.habilidadesMostrar = this.j1.pokemons[this.pokemonPeleandoj1].habilidades;
      this.jugador1Ataco = true;
    }
    else {
      this.habilidadesMostrar = this.j2.pokemons[this.pokemonPeleandoj2].habilidades;
      this.jugador2Ataco = true;
    }

  }

  cargarAtaque(i: number) {
    if (this.turno) {
      this.habilidadUsadaj1 = i;
      this.turno = false
      this.atacar = false;
    }
    else {
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
    if (this.turno) {
      this.pokePeleandoCambio = this.pokemonPeleandoj1;
      this.pokesParaCambio = this.j1.pokemons;
    }
    else {
      this.pokePeleandoCambio = this.pokemonPeleandoj2;
      this.pokesParaCambio = this.j2.pokemons;
    }
  }

  cambioj1(poke: number) {
    if (this.turno) {
      this.datUsuario.cambiarPokej1(poke);
      this.turno = false;
    }
    else {
      this.datUsuario.cambiarPokej2(poke);
      this.turno = true;
      this.finDeTurno();
    }
    this.cambioPokemon = false;
    if (this.cambioForzado) {
      this.turno = true;
      this.cambioForzado = false;
    }

  }

  //uso de objetos
  usarObjeto() {
    this.cambioPokemon = false;
    this.atacar = false;
    this.usoObjeto = true;
    if (this.turno) {
      this.vidaUsadaBtn = this.vidaUsadaj1;
      this.velcidadUsadaBtn = this.velocidadUsadaj1;
      this.ataqueUsadaBtn = this.ataqueUsadaj1;
      this.efectosUsadaBtn = this.efectosUsadaj1;
    }
    else {
      this.vidaUsadaBtn = this.vidaUsadaj2;
      this.velcidadUsadaBtn = this.velocidadUsadaj2;
      this.ataqueUsadaBtn = this.ataqueUsadaj2;
      this.efectosUsadaBtn = this.efectosUsadaj2;
    }
  }

  usoPocionVida() {
    if (this.turno) {
      if (!this.vidaUsadaj1) {
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
      if (!this.vidaUsadaj2) {
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

  usoPocionVelocidad() {
    if (this.turno) {
      if (!this.velocidadUsadaj1) {
        this.j1.pokemons[this.pokemonPeleandoj1].velocidad += 20;
        this.velocidadUsadaj1 = true;
        this.turno = false;
      }

    }
    else {
      if (!this.velocidadUsadaj2) {
        this.j2.pokemons[this.pokemonPeleandoj2].velocidad += 20;
        this.velocidadUsadaj2 = true;
        this.turno = true;
        this.finDeTurno();
      }
    }

    this.usoObjeto = false;

  }

  usoQuitarEfecto() {
    if (this.turno) {
      if (!this.efectosUsadaj1) {
        this.j1.pokemons[this.pokemonPeleandoj1].bajo_efecto = [];
        this.efectosUsadaj1 = true;
        this.turno = false;
      }
    }
    else {
      if (!this.efectosUsadaj2) {
        this.j2.pokemons[this.pokemonPeleandoj2].bajo_efecto = [];
        this.efectosUsadaj2 = true;
        this.turno = true;
        this.finDeTurno();
      }
    }

    this.usoObjeto = false;
  }

  usoPocionAtaque() {
    if (this.turno) {
      if (!this.ataqueUsadaj1) {
        this.j1.pokemons[this.pokemonPeleandoj1].ataque += 10;
        this.ataqueUsadaj1 = true;
        this.turno = false;
      }

    }
    else {
      if (!this.ataqueUsadaj2) {
        this.j2.pokemons[this.pokemonPeleandoj2].ataque += 10;
        this.ataqueUsadaj2 = true;
        this.turno = true;
        this.finDeTurno();
      }
    }

    this.usoObjeto = false;
  }

  finDeTurno() {

    this.usoObjeto = false;
    this.cambioPokemon = false;
    this.atacar = false;

    const pokej1: pokemon = this.j1.pokemons[this.pokemonPeleandoj1];
    const pokej2: pokemon = this.j2.pokemons[this.pokemonPeleandoj2];

    let paralysisj1: boolean = false;
    let sleepj1: boolean = false;
    let freezej1: boolean = false;
    let confusionj1: boolean = false;

    let paralysisj2: boolean = false;
    let sleepj2: boolean = false;
    let freezej2: boolean = false;
    let confusionj2: boolean = false;

    pokej1.bajo_efecto.forEach(efecto => {

      switch (efecto) {
        case "paralysis":
          if (Math.round(Math.random() * 100) < 50) {
            paralysisj1 = true;
          }
          break;

        case "sleep":
          if (Math.round(Math.random() * 100) < 75) {
            sleepj1 = true;
          }
          break;

        case "freeze":
          if (Math.round(Math.random() * 100) < 25) {
            freezej1 = true;
          }
          break;

        case "confusion":
          if (Math.round(Math.random() * 100) < 30) {
            confusionj1 = true;
          }
          break;

        default:
          break;
      }

    })

    pokej2.bajo_efecto.forEach(efecto => {

      switch (efecto) {
        case "paralysis":
          if (Math.round(Math.random() * 100) < 50) {
            paralysisj2 = true;
          }
          break;

        case "sleep":
          if (Math.round(Math.random() * 100) < 75) {
            sleepj2 = true;
          }
          break;

        case "freeze":
          if (Math.round(Math.random() * 100) < 25) {
            freezej2 = true;
          }
          break;

        case "confusion":
          if (Math.round(Math.random() * 100) < 30) {
            confusionj2 = true;
          }
          break;

        default:
          break;
      }

    })

    if (pokej1.velocidad > pokej2.velocidad) {
      if (this.jugador1Ataco) {
        if (paralysisj1 || sleepj1 || freezej1) {
          alert(pokej1.nombre + " esta bajo un efecto paralisante");
        }
        else {
          if(confusionj1)
          {
            this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej1, pokej2, this.habilidadUsadaj1);
          }
          else
          {
            this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej1, pokej2, this.habilidadUsadaj1);
          }

          if (this.j1.pokemons[this.pokemonPeleandoj1].habilidades[this.habilidadUsadaj1].ailment != "none") {
            this.asignarEfectosj1();
          }
        }

      }

      if (this.j2.pokemons[this.pokemonPeleandoj2].vidaActual > 0) {
        if (this.jugador2Ataco) {
          if(paralysisj2 || sleepj2 || freezej2)
          {
           alert(pokej2.nombre + " esta bajo un efecto paralisante");
          }
          else{
            if(confusionj2)
            {
              this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej2, pokej1, this.habilidadUsadaj2);

            }else{
              this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej2, pokej1, this.habilidadUsadaj2);
            }


          if (this.j2.pokemons[this.pokemonPeleandoj2].habilidades[this.habilidadUsadaj2].ailment != "none") {
            this.asignarEfectosj2();
          }
          }
        }

      }
      else {
        this.comprobarGanador();
        this.cambioForzado = true;
        this.turno = false;
        this.cambiarPokemon()
      }

    }
    else {
      if (this.jugador2Ataco) {
        if(paralysisj2 || sleepj2 || freezej2)
          {
           alert(pokej2.nombre + "esta bajo un efecto paralisante");
          }
          else{
            if(confusionj2)
            {
              this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej2, pokej1, this.habilidadUsadaj2);

            }else{
              this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej2, pokej1, this.habilidadUsadaj2);
            }

          if (this.j2.pokemons[this.pokemonPeleandoj2].habilidades[this.habilidadUsadaj2].ailment != "none") {
            this.asignarEfectosj2();
          }
          }
      }

      if (this.j1.pokemons[this.pokemonPeleandoj1].vidaActual > 0) {

        if(this.jugador1Ataco)
        {
          if (paralysisj1 || sleepj1 || freezej1) {
            alert(pokej1.nombre + " esta bajo un efecto paralisante");
          }
          else {
            if(confusionj1)
            {
              this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= this.calcularDaño(pokej1, pokej2, this.habilidadUsadaj1);
            }
            else
            {
              this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= this.calcularDaño(pokej1, pokej2, this.habilidadUsadaj1);
            }
  
            if (this.j1.pokemons[this.pokemonPeleandoj1].habilidades[this.habilidadUsadaj1].ailment != "none") {
              this.asignarEfectosj1();
            }
          }
        }
        
      }
      else {
        this.comprobarGanador();
        this.cambioForzado = true;
        this.cambiarPokemon();
      }

    }

    pokej1.bajo_efecto.forEach(efecto => {

      switch (efecto) {
        case "burn":
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= Math.round(pokej1.vida * 0.05);
          break;

        case "poison":
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= 35;
          break;

        default:
          break;
      }

    })

    pokej2.bajo_efecto.forEach(efecto => {

      switch (efecto) {
        case "burn":
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= Math.round(pokej2.vida * 0.05);
          break;

        case "poison":
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= 25;
          break;

        default:
          break;
      }

    })

    if (this.j2.pokemons[this.pokemonPeleandoj2].vidaActual < 0) {
      this.comprobarGanador()
      this.cambioForzado = true;
      this.turno = false;
      this.cambiarPokemon()
    }

    if (this.j1.pokemons[this.pokemonPeleandoj1].vidaActual < 0) {
      this.comprobarGanador();
      this.cambioForzado = true;
      this.cambiarPokemon();
    }

    if (this.quitarEfecto == 0) {
      this.j1.pokemons[this.pokemonPeleandoj1].bajo_efecto = [];
      this.j2.pokemons[this.pokemonPeleandoj2].bajo_efecto = [];
      this.quitarEfecto = 3;
    }
    else {
      this.quitarEfecto--;
    }

    this.jugador1Ataco = false;
    this.jugador2Ataco = false;

  }

  calcularDaño(poke1: pokemon, poke2: pokemon, habilidadusada: number): number {
    let dañio: number = 0;
    let multiplicadorpoke1 = 1;


    poke1.tipo.forEach(tip1 => {
      poke2.tipo.forEach(tip2 => {
        multiplicadorpoke1 *= this.tablatipos.obtenerFromTwoStrings(tip1, tip2);
      })
    })

    if (poke1.habilidades[habilidadusada].accuracy > Math.round(Math.random() * 100)) {
      if (poke1.habilidades[habilidadusada].damage_class == "special") {
        dañio = Math.round(((poke1.ataque_especial * poke1.habilidades[habilidadusada].power) / poke2.defensa_especial) * multiplicadorpoke1);
      }
      else {
        dañio = Math.round(((poke1.ataque * poke1.habilidades[habilidadusada].power) / poke2.defensa) * multiplicadorpoke1);
      }
    }
    else {
      alert("el ataque de " + poke1.nombre + " fallo");
    }

    return dañio;
  }

  asignarEfectosj1() {
    if (this.j1.pokemons[this.pokemonPeleandoj1].habilidades[this.habilidadUsadaj1].ailment_chance > Math.round(Math.random() * 100)) {
      this.j2.pokemons[this.pokemonPeleandoj2].bajo_efecto.push(this.j1.pokemons[this.pokemonPeleandoj1].habilidades[this.habilidadUsadaj1].ailment);
    }
  }

  asignarEfectosj2() {
    if (this.j2.pokemons[this.pokemonPeleandoj2].habilidades[this.habilidadUsadaj2].ailment_chance > Math.round(Math.random() * 100)) {
      this.j1.pokemons[this.pokemonPeleandoj1].bajo_efecto.push(this.j2.pokemons[this.pokemonPeleandoj2].habilidades[this.habilidadUsadaj2].ailment);
    }
  }

  comprobarGanador()
  {
    let muertosj1:number=0;
    let muertosj2:number=0;;
    const nuevaPartida:partida = {jugador1:this.j1.nombre,jugador2:this.j2.nombre,vencedor:false,pokemons:[this.j1.pokemons[0].id,this.j1.pokemons[1].id,this.j1.pokemons[2].id,this.j2.pokemons[0].id,this.j2.pokemons[1].id,this.j2.pokemons[2].id]}

    this.j1.pokemons.forEach(poke => {
      if(poke.vidaActual <= 0)
      {
        muertosj1++;
      }
    })

    this.j2.pokemons.forEach(poke => {
      if(poke.vidaActual <= 0)
      {
        muertosj2++;
      }
    })

    if(muertosj1==3)
    {
      alert("vitoria del j2");
      this.database.guardarPartida(nuevaPartida)
    }

    if(muertosj2==3)
    {
      alert("vitoria del j1");
      nuevaPartida.vencedor = true;
      this.database.guardarPartida(nuevaPartida)
    }
  }


}
