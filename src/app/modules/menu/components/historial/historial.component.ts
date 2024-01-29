import { Component, OnInit } from '@angular/core';
import { partida } from 'src/app/interfaces/interface-partida';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { forkJoin } from 'rxjs';
import { UsuariosDbService } from '../../../../services/usuarios-db.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private usuarioDBService: UsuariosDbService, private pokeService: PokeApiService){}

  async ngOnInit() {
    await this.imprimirHistorial();
  }


  

  


// ...

cargarPokes(historial:partida[]){
  historial.forEach((partida)=>{
    var parti:any={//partida con datos de pokemones
      jugador1: "",
      jugador2: "",
      vencedor: true,
      pokemons:[]
    };
    parti.jugador1=partida.jugador1;
    parti.jugador2=partida.jugador2;
    parti.vencedor=partida.vencedor;

    const observables = partida.pokemons.map(poke => this.pokeService.traerUnPokemon(poke));
    forkJoin(observables).subscribe(data => {
      parti.pokemons = data;
      this.cargarArregloHisto(parti);
    });
  });
}
  
  cargarArregloHisto(partida:any){
    this.histo.push(partida);
  }

  

  histo:any[]=[];//historial con datos de pokemones
  

  historial:partida[] | undefined=[];
  
  async imprimirHistorial(){

    this.historial=  await this.usuarioDBService.getHistorial();
    
    if(this.historial.length === 0){
      console.log("no hay historial"); 
    }
    else{
      this.cargarPokes(this.historial);
    }
  }

  


}
