import { Injectable } from '@angular/core';
import { habilidad } from './Clases/habilidad.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(private http: HttpClient) { }

  public traerHabilidades(): habilidad[] {
    let habilidades: habilidad[] = [];
    this.http.get<any>('https://pokeapi.co/api/v2/ability/?limit=327').subscribe((data) => {
      data.results.forEach(element => {
        let habilidadAux = new habilidad();
        habilidadAux.nombre = element.name;
        habilidadAux.url = element.url;
        habilidades.push(habilidadAux);
      });
    });
    return habilidades;
  }

}
