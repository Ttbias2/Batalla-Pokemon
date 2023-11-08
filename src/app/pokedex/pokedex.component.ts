import { Component, OnInit, NgModule  } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { HabilidadesService } from '../habilidades.service';
import { habilidad } from '../Clases/habilidad.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  inicio: number = 1;
  pokedex: number = 151;
  pokemons: any[] = [];
  constructor(private datPokemons: PokeApiService, private datHabilidades: HabilidadesService) {
  }
  ngOnInit(): void {
    this.llenarPokes();
    //this.buscarHabilidades();
    
  }
  llenarPokes() {
    this.datPokemons.getPokemonList(this.inicio, this.pokedex).subscribe(data => { this.mostrarpokes(data) });
  }
  mostrarpokes(pokes: any) {
    this.pokemons = pokes;
    
  }

  

  selectedPokemon: any;

  verPoke(id: number) {
    this.selectedPokemon = this.pokemons.find(poke => poke.id === id);
  }
  
  handleImageError(event: any) {
    event.target.src = 'assets/img/error.png';
  }

  selectedPokemonImg: any;
  mostrarPokeImg(id: number) {
    this.selectedPokemonImg.traerImagenPokemon(id).subscribe;
  }
//codigo para probar servicio habilidades
 /*  tipo: string='dragon';
  habilidades: any[] = [];
  habilidad: any;
  
  buscarHabilidades() {
    this.datHabilidades.traerHabilidadesPorTipo(this.tipo).subscribe(data => { this.mostrarHabilidades(data) });
    };
    mostrarHabilidades(habilidad: any) {
      this.habilidades = habilidad;
      console.log('ae');
      
    }
    */
  } 
  

  




