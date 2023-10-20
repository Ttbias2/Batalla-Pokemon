let olMostrarpokes = document.getElementById("olMostrarpokes");
let bAvanzar = document.getElementById("bAvanzar");
let bRetroceder = document.getElementById("bRetroceder");
let iBuscador = document.getElementById("iBuscador");
let bBuscar = document.getElementById("bBuscar");
let bTipo = document.querySelectorAll(".bTipo")

document.addEventListener("DOMContentLoaded",cargarpokes); //funcion que se activa al cargar la pagina y trae a los primero 20 pokes
bAvanzar.addEventListener("click", masPokes);
bRetroceder.addEventListener("click", menosPokes);
iBuscador.addEventListener("keyup", enter);
bBuscar.addEventListener("click",buscarPorNombID);

let limite = 20;//de cual a cual pokemon va amostrar
let inicio = 1;

function cargarpokes() {

    bTipo.forEach((boton)=>{
        boton.addEventListener("click",Tipos);
    })

    var pokemonsArray = [];//array para guardar los poke de las promesas y dps ordenarlos
    var promesas = [];// array para guardar promesas de los fetch

    for(let i=inicio;i<=limite;i++)
    {
        promesas.push(obtenerPokemonNombID(i)); //va a agregar la promesa del fetch de cada pokemon al array promesas
    }

    Promise.all(promesas) // cuando todas las promesas del array se cumplan ordena los resultados y los carga ordenados en pokemonarry ese array es enviado para mostrar
        .then(resultados => {
            pokemonsArray = ordenarPorId(resultados);
            cargarLista(pokemonsArray);
        });
}

function obtenerPokemonNombID(i) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
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
    
    vaciarLista();
 
    datos.forEach(dato => { // manda todos los datos para que se muestren
        
        dibujarApi(dato);
        
    });
}

function vaciarLista()
{
    while(olMostrarpokes.firstChild)
    {
        olMostrarpokes.removeChild(olMostrarpokes.firstChild);//si tiene algun hijo lo va a borrar
    }
}

function dibujarApi(dato){

    const itemLista = document.createElement("li");
    const imgPoke = document.createElement("img");
    const nombrePoke = document.createElement("p"); 
    imgPoke.src = dato.sprites.front_default;
    nombrePoke.textContent = dato.name;// se carga el item de la lista             

    imgPoke.className= 'imagenElegirPoke';
    nombrePoke.className= 'nombreElegirPoke';
    
    itemLista.appendChild(imgPoke);
    itemLista.appendChild(nombrePoke); 


    itemLista.className= 'pokeIndividual';
    
    olMostrarpokes.appendChild(itemLista);//se añade el item a la lista
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

function enter(event){
// comprueba siempre que se apriete un boton
//si es enter va a buscar el pokemon
    if (event.key == "Enter")
    {
        event.preventDefault(); 
        buscarPorNombID();
    }
//si el texto vuelve a estar en blanco se mostraran lso ultimos 20 y se podra avanzar y retroceder de nuevo
    if(iBuscador.value == "")
    {
        bAvanzar.disabled = false;
        bRetroceder.disabled = false; 
        cargarpokes();
    }

}

async function buscarPorNombID()
{
    let pokemon = await obtenerPokemonNombID(iBuscador.value);

    if(pokemon.id <= 151)//si el pokemon es de la primera generacion se mostrara y se desabilitara los botones para cambiar de pagina
    {
        vaciarLista();
        await dibujarApi(pokemon);
        bAvanzar.disabled = true;
        bRetroceder.disabled = true;    
    }
    
}

function Tipos()
{
   fetch(`https://pokeapi.co/api/v2/type/${this.value}/`)
   .then(response => {
        if(response.status == 200)
        {
            return response.json();
        }
        else
        {
            throw new Error("Error en la repuesta de la API");
        }
   })
   .then(data => {
    let pokemons = filtrarPrimeraGenTipo(data);
   })
   .catch(error => {
     console.error("ha ocurrido un error",error);
   })
}

function filtrarPrimeraGenTipo(data){

    let listapoke = [];
    let promesas = []; 

    data.pokemon.forEach(pokemon => {   
        promesas.push(obtenerPokemonNombID(pokemon.pokemon.name));     
    });

    Promise.all(promesas)
    .then(resultados => {
        resultados.forEach(pokemon=>{
            if(pokemon.id < 152)
            {
               listapoke.push(pokemon); 
            }
        })

        cargarLista(listapoke);
    })

}