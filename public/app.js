const app = function(){
const url = 'http://hp-api.herokuapp.com/api/characters'
makeRequest(url, requestComplete)
let jsonString = localStorage.getItem("currentChar");
let saveChar = JSON.parse(jsonString)
charDetails(saveChar)
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
  request.addEventListener('load', function() {
    loadColumnChart(request.responseText);
  });
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const chars = JSON.parse(jsonString);
  populateSelect(chars);
  getChar(chars)
};

const populateSelect = function(chars) {
  const select = document.getElementById('char-list')
  chars.forEach(function(char, index) {
    let option = document.createElement('option')
    option.innerText = char.name
    option.value = index
    select.appendChild(option)
  })
}

const getChar = function (chars) {
  const selectedChar = document.querySelector('select')
  selectedChar.addEventListener('change', function() {
    let char = chars[this.value]
    saveChar(char)
    charDetails(char)
  })
}

const charDetails = function (char) {
  console.log(char);
  const div = document.getElementById('char-details')
  clearContent(div)
  const charName = document.createElement('p')
  charName.innerText = `Name: ${char.name}`
  const charGender = document.createElement('p')
  charGender.innerText = `Gender: ${char.gender}`
  const charSpecies = document.createElement('p')
  charSpecies.innerText = `Species: ${char.species}`
  const charHouse = document.createElement('p')
  charHouse.innerText = `House: ${char.house}`
  const charPhoto = document.createElement('img')
  charPhoto.src = char.image
  div.appendChild(charName)
  div.appendChild(charGender)
  div.appendChild(charSpecies)
  div.appendChild(charHouse)
  div.appendChild(charPhoto)
  return div
}

const saveChar = function(char){
  const jsonString = JSON.stringify(char);
  localStorage.setItem('currentChar', jsonString);
}

const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}


var loadColumnChart = function(responseText) {
  var chars = JSON.parse(responseText);


  var characterHouseData = {
    name: "Number of students",
    data: [],
    color:  "#ff6f69"
  };

  var characterHouseLabels = [];


  for(char of chars) {
    if(!characterHouseLabels.includes(char.house)) {
      characterHouseLabels.push(char.house);
    }
  }

  for(label of characterHouseLabels) {
    var num = 0;
    for(char of chars) {
      if(char.house == label) {
        num ++;
      }
    }
    characterHouseData.data.push(num);
  }

new ColumnChart("House numbers", characterHouseData, characterHouseLabels);
};

window.addEventListener('load', app);

/////

window.addEventListener('DOMContentLoaded', function(){
  const canvas = document.querySelector('#main-canvas');
  const context = canvas.getContext('2d');


  const drawCircle = function(x,y){
  context.beginPath();
  // context.moveTo(x, y);
  context.arc(x, y, 60, 0, Math.PI*2, true);
  context.stroke();
  }

  canvas.addEventListener('mousemove', function(event){
    drawCircle(event.x, event.y);
  })

  const changeColour = function(){
    context.strokeStyle = this.value;
  }

  const colourPicker = document.querySelector('#input-colour');
  colourPicker.addEventListener('change', changeColour)

  })
