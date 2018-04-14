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
    loadPieCharts(request.responseText);
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




// window.addEventListener('load', app);

///////

// request.addEventListener('load', function() {
//   loadPieCharts(request.responseText);
// });

// });



var loadPieCharts = function(responseText) {
  var chars = JSON.parse(responseText);

  houseData = [];

  for(char of chars) {
    houseData.push({
      name: char.name,
      // y: char.house,
    });
  }

  // var countryRegionData = {
  //   name: "Number of Countries",
  //   data: []
  // };
  //
  // var countryRegionLabels = [];
  //
  // for(country of countries) {
  //   if(!countryRegionLabels.includes(country.region)) {
  //     countryRegionLabels.push(country.region);
  //   }
  // }
  //
  // for(label of countryRegionLabels) {
  //   var num = 0;
  //   for(country of countries) {
  //     if(country.region == label) {
  //       num ++;
  //     }
  //   }
  //   countryRegionData.data.push(num);
  // }

  new PieChart("House data", houseData);

};

window.addEventListener('load', app);
