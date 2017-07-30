'use strict';
// header
var menuButton = document.querySelector('.btn-menu');
var mobileMenu = document.querySelector('.nav-small');

menuButton.addEventListener('click', showOrHideMenu);

function showOrHideMenu() {
  mobileMenu.classList.toggle('nav-small-show');

}
// modal
var sentence = document.querySelector('.phrase');
var modal = document.querySelector('.info');
// var buttonOpen = document.querySelector('btn-open');
var buttonClose = document.querySelector('h1');

function showProduct(event) {
  sentence.innerHTML = event.target.innerHTML;
  modal.classList.add('modal-show');
}

sentence.addEventListener ('click', showProduct);

function closeModal() {
  modal.classList.remove('modal-show');
}

buttonClose.addEventListener ('click', closeModal);

// api pokemon
var pokemonName = document.getElementById('name');
var picture = document.getElementById('picture');
var num = document.getElementById('num');
var type= document.getElementById('type');
var numberOfPokemons = 50;

function requestInfo(number) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://pokeapi.co/api/v2/pokemon/' + number + '/', true);
  request.addEventListener('load', function(){
    refreshWeb(request);
  });
  request.addEventListener('error', function() {
    console.log('Error al tratar de conectarse con el servidor');
  });
  request.send();
}


function refreshWeb(request){
  if(request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    var container = document.querySelector('.cards-container');
    container.innerHTML += '<p><img src="' + data.sprites.front_default +'"></p>';
    container.innerHTML += '<p>Nombre:' + data.name +'</p>';
    container.innerHTML += '<p>Número:' + data.id +'</p>';
    var types = data.types;
    if(types.length === 1){
      container.innerHTML += '<p>Tipo:' + types[0].type.name +'</p>';
    } else {
      container.innerHTML += '<p>Tipo:' + types[0].type.name + '/' + types[1].type.name +'</p>';
    }
  } else {
    console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
  }
}

for (var i = 1; i <= numberOfPokemons; i++) {
  requestInfo(i);
}
