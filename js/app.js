const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostarAlerta('Agregra un nombre del pokemon');

        return;
    }

    buscarPokemones();



}

function mostarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.bg-red-100');


    if (!existeAlerta) {

        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', 'error');

        alerta.innerHTML = `
         <strong class = "font-bold">Error</strong>
         <span class = "block sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);


    }

}



function buscarPokemones() {

    const termino = document.querySelector('#termino').value;

    const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarPokemones(resultado);
        })

}


function mostrarPokemones(pokemones) {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }


    let habilidad = pokemones.abilities.map((abilities) => abilities.ability.name);
    let habilidaes = habilidad.join(', ').toString();
    let imagen = pokemones.sprites.other.dream_world.front_default;
    console.log(imagen)
    let nombre = pokemones.name;
    let tipo = pokemones.types.map((types) => types.type.name);
    let tipos = tipo.join(', ').toString();
    let altura = pokemones.height;
    // Convertir el peso que viene del api a string y luego ejecutar el metodo splice para eliminar el ultimo caracter
    let peso = pokemones.weight;
    let pesoPo = peso.toString();
    let pesoPokemon = pesoPo.slice('0', -1);
    let orden = pokemones.order;



    resultado.innerHTML += `
    <div class="habilidades"><p> Habilidades: ${habilidaes}</p></div>
    <div class="imagen"><p><img src= ${imagen}></p></div>
    <div class="nombre"><h2>${nombre}</h2></div>
    <div class="tipo"><p>Tipo: ${tipos}<p></div>
    <div class="altura"><p>Altura = ${altura}0 cm <p></div>
    <div class="peso"><p>Peso = ${pesoPokemon} Kg <p></div>
    <div class="numero"><p>Numero Pokedex = ${orden}  <p></div>
    `


}