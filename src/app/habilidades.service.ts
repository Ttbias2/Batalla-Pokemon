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
  normal: number[]=[130, 63, 43, 48];
  fighting: number[]= [26, 136];
  flying: number[]=[17, 19];
  poison: number[]=[40,77];
  ground:number[]= [28, 89];
  rock:number[]= [88, 157];
  bug: number[]=[41, 81];
  ghost:number[]= [122, 109];
  steel:number[]=  [];
  fire:number[]= [53, 126];
  water: number[]=[55, 56];
  grass:number[]= [22, 71];
  electric:number[]= [84, 86];
  psychic:number[]= [60, 95];
  ice:number[]= [58, 8];
  dragon: number[]=[82];
  fairy:number[]=  [];


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
          requests.push(this.traerHabilidad(id));
          });
        
        break;
      case 'ground':
        this.ground.forEach(id => {
          requests.push(this.traerHabilidad(id));
          
        });
        break;
      case 'rock':
        this.rock.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'bug':
        this.bug.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'ghost':
        this.ghost.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'steel':
        this.steel.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'fire':
        this.fire.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'water':
        this.water.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'grass':
        this.grass.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'electric':
        this.electric.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'psychic':
        this.psychic.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'ice':
        this.ice.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'dragon':
        this.dragon.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
      case 'fairy':
        this.fairy.forEach(id => {
          requests.push(this.traerHabilidad(id));
        });
        break;
    }
      

    
    return forkJoin(requests);
  }

}
