import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-eleccion-equipos',
  templateUrl: './eleccion-equipos.component.html',
  styleUrls: ['./eleccion-equipos.component.css']
})
export class EleccionEquiposComponent implements OnInit {

  pokemons: any[] = [];
  detallePokemon: any;
  inicio: number = 1;
  fin: number = 20;
  siguienteDesabilitado: boolean = false;
  anteriorDesabilitado: boolean = true;
  mostrarDetalle: boolean = false;
  pokeBusc: any = "";

  tipos: string[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "fairy"]

  constructor(private datPokemons: PokeApiService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.llenarPokes();
  }

  llenarPokes() {
    this.datPokemons.getPokemonList(this.inicio, this.fin).subscribe(data => { this.mostrarpokes(data) });
  }

  mostrarpokes(pokes: any) {
    this.pokemons = pokes;
  }

  masPokes() {

    this.anteriorDesabilitado = false;

    this.inicio += 20;
    this.fin += 20;

    if (this.fin > 151)  //cambia los numeros de pokemons que se van a mostrar para arriba
    {
      this.inicio = 141;
      this.fin = 151;
      this.siguienteDesabilitado = true;
    }

    this.llenarPokes();

  }

  menosPokes() {

    if (this.fin == 151) {
      this.fin = 140;
      this.inicio = 121;
      this.siguienteDesabilitado = false;
    }
    else {
      this.inicio -= 20;
      this.fin -= 20;    // cambia los numeros de pokemons que se van a mostrar para abajo
    }

    if (this.inicio == 1) {
      this.anteriorDesabilitado = true;
    }

    this.llenarPokes();
  }

  verPoke(e: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: e,
    });;
    dialogRef.componentInstance.buscarPokemon();
  }

  filtrarPorTipo(iTipo: number) {
    this.datPokemons.traerPorTipo(this.tipos[iTipo]).subscribe(data => this.actualizarPokes(data));
  }

  actualizarPokes(pokes: any) {
    this.pokemons = [];
    for (const poke of pokes.pokemon) {
      this.datPokemons.traerUnPokemon(poke.pokemon.name).subscribe(data => this.cargarArray(data));
    }
  }

  cargarArray(poke: any) {

    if (poke.id < 152) {
      this.pokemons.push(poke);
    }

  }

  estaVacio(e: any) {

    this.pokeBusc = e.target.value;

    if (this.pokeBusc == "") {
      this.llenarPokes();
    }
  }

  buscarUnPoke() {
    if (this.pokeBusc != "") {
      this.datPokemons.traerUnPokemon(this.pokeBusc).subscribe(data => this.mostrarUnPoke(data))

    }
  }

  mostrarUnPoke(poke: any) {
    this.pokemons = [];
    this.pokemons.push(poke)
  }


}
