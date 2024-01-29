import { Component, OnInit, NgModule  } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { habilidad } from 'src/app/Clases/habilidad.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  inicio: number = 1;
  pokedex: number = 151;
  pokemons: any[] = [];
  constructor(private datPokemons: PokeApiService, private datHabilidades: HabilidadesService, private typesService: TypesService) {
  }
  ngOnInit(): void {
    this.llenarPokes();

  }

testHabilidades(){
  console.log('test habilidades');
  
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
   tipo: string='dragon';
  habilidades: habilidad[] = [];
  habilidad: habilidad;
  
 
} 
  

  




