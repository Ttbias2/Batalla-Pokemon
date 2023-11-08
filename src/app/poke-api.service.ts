import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  

  constructor(private http: HttpClient) { }

  public getPokemonList(inicio: number, fin: number): Observable<any[]> {
    const requests: Observable<any>[] = [];

    for (inicio; inicio <= fin; inicio++) {
      const urlApi = `https://pokeapi.co/api/v2/pokemon/${inicio}`;
      requests.push(this.http.get<any>(urlApi));
    }

    return forkJoin(requests);
  }

  public traerImagenPokemon(dato: string): Observable<any> {
    const urlApi = `https:/raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dato}.png`;
    return this.http.get<any>(urlApi);
  }

  public traerUnPokemon(datoBusc: any): Observable<any> {

    const urlApi = `https://pokeapi.co/api/v2/pokemon/${datoBusc}`;
    return this.http.get<any>(urlApi);

  }

  public traerPorTipo(tipo:String):Observable<any>
  {

    const urlApi = `https://pokeapi.co/api/v2/type/${tipo}/`;
    let resultado = this.http.get<any>(urlApi);

    return resultado;
  }

}