let olMostrarpokes = document.getElementById("olMostrarpokes");
let bAvanzar = document.getElementById("bAvanzar");
let bRetroceder = document.getElementById("bRetroceder");

document.addEventListener("DOMContentLoaded",cargarpokes); //funcion que se activa al cargar la pagina y trae a los primero 20 pokes
bAvanzar.addEventListener("click", masPokes)
bRetroceder.addEventListener("click", menosPokes)

let limite = 20;//de cual a cual pokemon va amostrar
let inicio = 1;

function cargarpokes() {
    var pokemonsArray = [];//array para guardar los poke de las promesas y dps ordenarlos
    var promesas = [];// array para guardar promesas de los fetch

    for(let i=inicio;i<=limite;i++)
    {
        promesas.push(obtenerPokemon(i)); //va a agregar la promesa del fetch de cada pokemon al array promesas
    }

    Promise.all(promesas) // cuando todas las promesas del array se cumplan ordena los resultados y los carga ordenados en pokemonarry ese array es enviado para mostrar
        .then(resultados => {
            pokemonsArray = ordenarPorId(resultados);
            cargarLista(pokemonsArray);
        });
}

function obtenerPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (response.status == 200) {
                return response.json();                            //se hace la llamada a la api para traer un pokemon y retorna la promesa de esta llamada
            } else {
                throw new Error('Error en la respuesta de la API');
            }
        })
        .catch(error => {
            console.error("Ha ocurrido un error", error);
        });
}

function cargarLista(datos) {
    
    while(olMostrarpokes.firstChild)
    {
        olMostrarpokes.removeChild(olMostrarpokes.firstChild);//si tiene algun hijo lo va a borrar
    }

    datos.forEach(dato => {
        const itemLista = document.createElement("li");
        const imgPoke = document.createElement("img");
        const nombrePoke = document.createElement("p"); 
        imgPoke.src = dato.sprites.front_default;
        nombrePoke.textContent = dato.name;// se carga el item de la lista             

        itemLista.appendChild(imgPoke);
        itemLista.appendChild(nombrePoke); 

        olMostrarpokes.appendChild(itemLista);//se añade el item a la lista
    });
}

function ordenarPorId(pokemonArray) {
    return pokemonArray.sort((a, b) => a.id - b.id); //funcion para ordenar la lista
}

function masPokes(){
   
 bRetroceder.disabled = false;   

 inicio += 20;
 limite += 20;

 if(limite>151)  //cambia los numeros de pokemons que se van a mostrar para arriba
 {
    inicio = 141;
    limite = 151;
    bAvanzar.disabled = true;
 }

 cargarpokes();

}

function menosPokes(){
    
    if(limite==151)
    {
        limite=140;
        inicio=121;
        bAvanzar.disabled = false;
    }
    else
    {
        inicio-=20;
        limite-=20;    // cambia los numeros de pokemons que se van a mostrar para abajo
    }
    
    if(inicio == 1)
    {
        bRetroceder.disabled = true;
    }

    cargarpokes();
}