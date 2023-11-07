import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  inicio: number = 1;
  pokedex: number = 151;

  constructor() { }

  ngOnInit() {
    this.cargarPokemons();
  }

  prueba() {
    console.log("aaa");
  }

  cargarPokemons() {
    let arrayPoke: any[] = [];
    const promesa: Promise<any>[] = [];

    for (let i = this.inicio; i <= this.pokedex; i++) {
      promesa.push(this.obtenerPokemonNombID(i));
    }

    Promise.all(promesa).then((resultados) => {
      arrayPoke = this.ordenarPorId(resultados);
      this.cargarTablaPokedex(arrayPoke);
    });
  }

  cargarTablaPokedex(datos: any[]) {
    datos.forEach((element) => {
      this.dibujarTabla(element);
    });
  }

  dibujarTabla(dato: any) {
    const tabla = document.getElementById("bodyTablaPokes");
    const tr = document.createElement("tr");
    tr.setAttribute('id', 'fila');
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const botonNombre = document.createElement('p');
    const td3 = document.createElement("td");
    const img = document.createElement("img");
    td1.innerText = `${dato.id}`;
    botonNombre.innerText = `${dato.name}`;
    const pokeId = dato.id;
    img.src = dato.sprites.front_default;
    tabla!.appendChild(tr);
    tr.appendChild(td1);
    td2.appendChild(botonNombre);
    tr.appendChild(td2);
    td3.appendChild(img);
    tr.appendChild(td3);
    
    tr.addEventListener("click", () => {
      console.log(`Clic en el botón ${dato.name}`);
      this.seleccionarPorId(pokeId);
    });
  }

  obtenerPokemonNombID(i: number) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => {
        if (response.status == 200) {
          return response.json(); // se hace la llamada a la API para traer un Pokémon y retorna la promesa de esta llamada
        } else {
          throw new Error("Error en la respuesta de la API");
        }
      })
      .catch((error) => {
        console.error("Ha ocurrido un error", error);
      });
  }

  ordenarPorId(pokemonArray: any[]) {
    return pokemonArray.sort((a, b) => a.id - b.id); // función para ordenar la lista
  }

  async seleccionarPorId(id: number) {
    const pokemon = await this.obtenerPokemonNombID(id);
    if (pokemon.id <= this.pokedex) {
      this.limpiarLista();
      this.mostrarDatosPokemon(pokemon);
    }
  }

  mostrarDatosPokemon(pokemon: any) {
    const divDatos = document.getElementById("datosPokemon");
    const nombreLista = document.createElement("oi");
    nombreLista.setAttribute('id', 'listadato');
    const imgPoke = document.createElement("img");
    const nombre = document.createElement('p');
    const type = document.createElement('p');
    const weight = document.createElement('p');
    imgPoke.src = pokemon.sprites.front_default;
    nombre.textContent = pokemon.name;
    if (pokemon.types && Array.isArray(pokemon.types)) {
      const tipos = pokemon.types.map((tipo: any) => tipo.type.name);
      type.textContent = `Tipo: ${tipos}`;
    } else {
      // Manejar el caso en el que no se encuentren tipos
      type.textContent = "Tipo: Desconocido";
    }
    weight.textContent = `Peso: ${pokemon.weight}`;

    divDatos!.appendChild(nombreLista);
    nombreLista.appendChild(imgPoke);
    nombreLista.appendChild(nombre);
    nombreLista.appendChild(type);
    nombreLista.appendChild(weight);
  }

  limpiarLista() {
    const divDatos = document.getElementById("datosPokemon");
    while (divDatos!.firstChild) {
      divDatos!.removeChild(divDatos!.firstChild);
    }
  }
}
