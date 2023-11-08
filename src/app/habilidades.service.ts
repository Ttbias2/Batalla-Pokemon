import { Injectable } from '@angular/core';
import { habilidad } from './Clases/habilidad.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(private http: HttpClient) { }

  //listado tipos
  normal: [130, 63, 43, 48];
  fighting: [26, 136];
  flying: [17, 19];
  poison: [40,77];
  ground: [28, 89];
  rock: [88, 157];
  bug: [41, 81];
  ghost: [122, 109];
  steel: []=  [];
  fire: [53, 126];
  water: [55, 56];
  grass: [22,71 ];
  electric: [84, 86];
  psychic: [60, 95];
  ice: [58, 8];
  dragon: [82];
  fairy: []= [];


  public traerHabilidad(id: number): Observable<any>{
    const urlApi = `https://pokeapi.co/api/v2/move/${id}`;
    return this.http.get<any>(urlApi);
  }

  

  public traerHabilidadesPorTipo (tipo: string): Observable<any[]>{
    const requests: Observable<any>[] = [];
    switch (tipo) {
      case 'normal': 
      this.normal.forEach(id => {
        requests.push(this.traerHabilidad(id));
      });
      break;
        
      case 'fighting':
        
          this.fighting.forEach(id => {
            requests.push(this.traerHabilidad(id));
          });
        
        break;
      case 'flying':
        this.flying.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'poison':
        this.poison.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'ground':
        this.ground.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'rock':
        this.rock.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'bug':
        this.bug.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'ghost':
        this.ghost.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'steel':
        this.steel.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'fire':
        this.fire.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'water':
        this.water.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'grass':
        this.grass.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'electric':
        this.electric.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'psychic':
        this.psychic.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'ice':
        this.ice.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'dragon':
        this.dragon.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
      case 'fairy':
        this.fairy.forEach(id => {
          this.traerHabilidad(id).subscribe(habilidad => {
            requests.push(habilidad);
          });
        });
        break;
    }
      

    //return this.http.get<any>(urlApi);
    return forkJoin(requests);
  }

}
