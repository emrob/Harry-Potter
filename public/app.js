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
  div.appendChild(charPhoto)
  div.appendChild(charName)
  div.appendChild(charGender)
  div.appendChild(charSpecies)
  div.appendChild(charHouse)

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

///

var loadColumnChart = function(responseText) {
  var chars = JSON.parse(responseText);


  var characterHouseData = {
    name: "Number of students",
    data: [],
    color:  "#ff6f69"
  };

  var characterHouseLabels = [];


  for(char of chars) {
    if(char.hogwartsStudent === true){
    if(!characterHouseLabels.includes(char.house)) {
      characterHouseLabels.push(char.house);
    }
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

new ColumnChart("Number of Students per House", characterHouseData, characterHouseLabels);
};

window.addEventListener('load', app);

/////



var img = new Image();
img.src = 'http://wallfocus.com/cache/images/b/f/3/4/0/bf340650c27b44af6ea2d8014169777e59ecad94.png';
var CanvasXSize = 800;
var CanvasYSize = 600;
var speed = 50; // lower is faster
var scale = 1.05;
var y = -4.5; // vertical offset

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;

    if (imgW > CanvasXSize) {
        // image larger than canvas
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        // image width larger than canvas
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        // image height larger than canvas
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }

    // get canvas context
    ctx = document.getElementById('main-canvas').getContext('2d');

    // set refresh rate
    return setInterval(draw, speed);
}

function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        // reset, start from beginning
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        // draw additional image1
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        // draw additional image2
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    }

    // image is > Canvas Size
    else {
        // reset, start from beginning
        if (x > (CanvasXSize)) {
            x = CanvasXSize - imgW;
        }
        // draw aditional image
        if (x > (CanvasXSize-imgW)) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    // draw image
    ctx.drawImage(img, x, y,imgW, imgH);
    // amount to move
    x += dx;
}

/////


// window.addEventListener('DOMContentLoaded', function(){
//   const drawCanvas = document.querySelector('#draw-canvas');
//   const context = drawCanvas.getContext('2d');
//
//   const drawCircle = function(x,y){
//   context.beginPath();
//   context.arc(x, y, 60, 0, Math.PI*2, true);
//   context.stroke();
//   }
//
//   drawCanvas.addEventListener('mousemove', function(event){
//   drawCircle(event.x, event.y);
//   })
//
//   const changeColour = function(){
//   context.strokeStyle = this.value;
//   }
//
//   const colourPicker = document.querySelector('#input-colour');
//   colourPicker.addEventListener('change', changeColour)
//
//   })

  ////

  const initialize = function(){

  const container = document.getElementById('main-map');
  const center = {lat:51.6904164, lng: -0.4197687}
  const hagrid = {lat:56.6675343, lng: -5.0623299}
  const hogwarts = {lat:55.1010664, lng: -1.7059204}

  const zoom = 5;



  const mainMap = new MapWrapper(container, center, zoom);

  const marker = mainMap.addMarker(center);
  mainMap.addInfoWindow(marker, "<h4>Harry's House<h4><h4>4 Privet Drive<h4>");
  const secondMarker = mainMap.addMarker(hagrid);
  mainMap.addInfoWindow(secondMarker, "<h4>Hagrid's Hut<h4><h4>Ballachulish PH49 4HX<h4>");

  const thirdMarker = mainMap.addMarker(hogwarts);
  mainMap.addInfoWindow(thirdMarker, "<h4>Hogwarts<h4><h4>Alnwick Castle, NE66 1NQ<h4>");

}
  window.addEventListener('DOMContentLoaded', initialize)
